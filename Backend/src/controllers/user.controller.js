import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendOTP } from "../utils/Nodemailer.js";

/*this is the function for generating access tokenwhere we can use these
                token by exporting them from dataset because they are quite common*/

const generateAccessAndRefreshtoken = async (userId) => {
        try {
                const user = await User.findById(userId);
                const accessToken = user.generateAccessToken();
                const refreshToken = user.generateRefreshToken();

                user.refreshToken = refreshToken;
                await user.save({ validateBeforeSave: false });
                return { accessToken, refreshToken };
        } catch (error) {
                throw new ApiError(
                        500,
                        "Something went wrong while generating referesh and access token",
                );
        }
};

/***** starting here ****/
const registerUser = asyncHandler(async (req, res) => {
        // Get user details from frontend
        const { fullName, email, username, password } = req.body;

        // Check for missing fields
        if (
                [fullName, email, username, password].some(
                        (field) => field?.trim() === "",
                )
        ) {
                throw new ApiError(400, "All fields are required");
        }

        const existedUser = await User.findOne({
                $or: [{ username }, { email }],
        });

        if (existedUser) {
                throw new ApiError(
                        409,
                        "User with email or username already exists",
                );
        }

        const avatarlocalPath = req.files?.avatar?.[0]?.path;
        let coverImageLocalPath;

        // Handle cover image if provided
        if (
                req.files &&
                Array.isArray(req.files.coverImage) &&
                req.files.coverImage.length > 0
        ) {
                coverImageLocalPath = req.files.coverImage[0]?.path;
        }

        if (!avatarlocalPath) {
                throw new ApiError(400, "Avatar file is required");
        }

        let avatar;
        try {
                avatar = await uploadOnCloudinary(avatarlocalPath);
        } catch (error) {
                console.error("Error uploading avatar:", error);
                throw new ApiError(500, "Error uploading avatar");
        }

        let coverImage;
        if (coverImageLocalPath) {
                try {
                        coverImage =
                                await uploadOnCloudinary(coverImageLocalPath);
                } catch (error) {
                        console.error("Error uploading cover image:", error);
                        throw new ApiError(500, "Error uploading cover image");
                }
        }

        // Create user in the database
        let user;
        try {
                user = await User.create({
                        fullName,
                        avatar: avatar.url,
                        coverImage: coverImage?.url || "",
                        email,
                        password,
                        username: username.toLowerCase(),
                });
        } catch (error) {
                console.error("Error creating user in DB:", error);
                throw new ApiError(500, "Error creating user in database");
        }

        // Retrieve the created user without password and refresh token fields
        const createdUser = await User.findById(user._id).select(
                "-password -refreshToken",
        );

        if (!createdUser) {
                throw new ApiError(
                        500,
                        "User created but could not be retrieved",
                );
        }

        return res
                .status(201)
                .json(
                        new ApiResponse(
                                200,
                                createdUser,
                                "Registered successfully",
                        ),
                );
});

const loginUser = asyncHandler(async (req, res) => {

        const { email, username, password } = req.body;
        if (!username && !email) {
                throw new ApiError(400, "username or email is required");
        }

        const user = await User.findOne({
                $or: [{ username }, { email }],
        });

        if (!user) {
                throw new ApiError(404, "User does not exist");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
                throw new ApiError(401, "Password is not correct kindly check your password");
        }

        const { accessToken, refreshToken } =
                await generateAccessAndRefreshtoken(user._id);

        const loggedInUser = await User.findById(user._id).select("-password ");

        const options = {
                httpOnly: true,
                secure: true,
                sameSite: "None",
        };

        return res

                .status(200)
                .cookie("refreshToken", refreshToken, options)
                .cookie("accessToken", accessToken, options)

                .json(
                        new ApiResponse(
                                200,
                                {
                                        user: loggedInUser,
                                        accessToken,
                                        refreshToken,
                                },
                                "User logged In Successfully",
                        ),
                );
});

const logOutUser = asyncHandler(async (req, res) => {
        if (!req.user) {
                return res
                        .status(401)
                        .json(new ApiResponse(401, {}, "Unauthorized"));
        }

        await User.findByIdAndUpdate(
                req.user?._id,
                { $unset: { refreshToken: 1 } },
                { new: true },
        );

        const options = {
                httpOnly: true,
                secure: true,
                sameSite: "None",
        };

        return res
                .status(200)
                .clearCookie("accessToken", options)
                .clearCookie("refreshToken", options)
                .json(new ApiResponse(200, {}, "User Logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
        const incomingRefreshToken = req.cookies.refreshToken;
        if (!incomingRefreshToken) {
            throw new ApiError(401, "Unauthorized Request");
        }
    
        try {
            // Verify the refresh token
            const decodedToken = Jwt.verify(
                incomingRefreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );
    
            // Find the user based on the ID from the refresh token
            const user = await User.findById(decodedToken?._id);
            if (!user) {
                throw new ApiError(401, "Invalid refresh token");
            }
    
            // 🔴 Check if the refresh token matches the one stored in the database
            if (incomingRefreshToken !== user.refreshToken) {
                throw new ApiError(401, "Refresh token is expired or does not match");
            }
    
            // Here, check if the access token has expired (you can store the expiration time in the JWT payload)
            const currentAccessToken = req.cookies.accessToken;  // Assuming you have access to the current access token
            try {
                Jwt.verify(currentAccessToken, process.env.ACCESS_TOKEN_SECRET);  // Try to verify it
                
                return res.status(200).json(new ApiResponse(200, "Access token is still valid"));
            } catch (err) {
                // If the access token is invalid or expired, generate a new one
                const { accessToken } = await user.generateAccessToken();
                
                // Send the new access token as a cookie and in the response
                const options = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // Only true in production for HTTPS
                    sameSite: "None",
                };
    
                return res
                    .status(200)
                    .cookie("accessToken", accessToken, options)  // Set the new access token cookie
                    .json(new ApiResponse(200, { accessToken }, "Access token refreshed successfully"));
            }
        } catch (error) {
            console.error("Error during token refresh:", error);
    
            if (error.name === "TokenExpiredError") {
                throw new ApiError(401, "Refresh token expired. Please log in again.");
            }
    
            throw new ApiError(401, error.message || "Invalid refresh token");
        }
    });
    
    

const changePassword = asyncHandler(async (req, res) => {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!(confirmPassword === newPassword)) {
                throw new ApiError(404, "password not matching");
        }

        const user = await User.findById(req.user?.id);
        const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);

        if (!isPasswordCorrect) {
                throw new ApiError(400, "Invalid Password");
        }

        user.password = newPassword;

        await user.save({ validateBeforeSave: false });

        return res
                .status(200)
                .json(new ApiResponse(200, {}, "password changed succesfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
        return res
                .status(200)
                .json(
                        new ApiResponse(
                                200,
                                req.user,
                                "current user fetched succesfully",
                        ),
                );
});


const updateAccountdetail = asyncHandler(async (req, res) => {
        const { fullName, email } = req.body;

        if (!(fullName || email)) {
                throw new ApiError(400, "At least one field is required");
        }

        // Update user info
        const updatedUser = await User.findByIdAndUpdate(
                req.user?._id,
                {
                        $set: {
                                ...(fullName && { fullName }),
                                ...(email && { email }),
                        },
                },
                { new: true }
        );

        if (!updatedUser) {
                throw new ApiError(404, "User not found");
        }

        // Generate new tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshtoken(updatedUser._id);

        // Get full updated user object
        const userData = await User.findById(updatedUser._id).select("-password");

        const options = {
                httpOnly: true,
                secure: true,
                sameSite: "None",
        };

        return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(
                        new ApiResponse(
                                200,
                                {
                                        user: userData,
                                        accessToken,
                                        refreshToken,
                                },
                                "Account details updated successfully"
                        )
                );
});
    

const updateUserAvatar = asyncHandler(async (req, res) => {
        
        const avatarLocalPath = req.files?.path;
        if (!avatarLocalPath) {
                throw new ApiError(400, "Avatar File is missing");
        }
        const avatar = await uploadOnCloudinary(avatarLocalPath);

        if (!avatar.url) {
                throw new ApiError(400, "error while uploading");
        }
        const currentUser = await User.findById(req.user?._id).select(
                "-password",
        );

        if (currentUser && currentUser.avatar) {
                await deleteFromCloudinary(currentUser.avatar);
        }

        const updateuser = await User.findByIdAndUpdate(
                req.user?._id,
                {
                        $set: { avatar: avatar.url },
                },
                { new: true },
        ).select("-password");

        return res
                .status(200)
                .json(
                        new ApiResponse(
                                200,
                                updateuser,
                                "image updated succesfully",
                        ),
                );
});


const requestPasswordResetOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) throw new ApiError(400, "Email is required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  // Generate a 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  user.resetPasswordOTP = otp;
  user.resetPasswordOTPExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
  await user.save({ validateBeforeSave: false });

  try {
    // Send OTP via email
    await sendOTP(user.email, otp);
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw new ApiError(500, "Could not send OTP email");
  }

  res.status(200).json(new ApiResponse(200, {}, "OTP sent to your email"));
});


const resetPasswordWithOTP = asyncHandler(async (req, res) => {
        const { email, otp, newPassword, confirmPassword } = req.body;
      

      
        if (!(email && otp && newPassword && confirmPassword)) {
          throw new ApiError(400, "All fields are required");
        }
      
        if (newPassword !== confirmPassword) {
          throw new ApiError(400, "Passwords do not match");
        }
      
        const user = await User.findOne({ email });
        if (!user) throw new ApiError(404, "User not found");
        if (
          !user.resetPasswordOTP ||
          user.resetPasswordOTP !== otp ||
          Date.now() > user.resetPasswordOTPExpiry
        ) {
          throw new ApiError(400, "Invalid or expired OTP");
        }
      
        user.password = newPassword;
        user.resetPasswordOTP = undefined;
        user.resetPasswordOTPExpiry = undefined;
      
        await user.save();
      
        return res
          .status(200)
          .json(new ApiResponse(200, {}, "Password reset successful"));
      });





export {
        registerUser,
        loginUser,
        logOutUser,
        refreshAccessToken,
        getCurrentUser,
        changePassword,
        updateAccountdetail,
        updateUserAvatar,
        requestPasswordResetOTP,
        resetPasswordWithOTP,
};