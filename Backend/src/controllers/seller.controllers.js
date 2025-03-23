import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Seller } from "../models/seller.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Jwt from "jsonwebtoken";

      
                const generateAccessSessionTokenAndRefreshSessionToken = async (userId) => {
                        try {
                                const user = await Seller.findById(userId);
                                const accessSessionToken = user.generateAccessToken();
                                const refreshSessionToken = user.generateRefreshToken();
                
                                user.refreshSessionToken = refreshSessionToken;
                                await user.save({ validateBeforeSave: false });
                                return { accessSessionToken, refreshSessionToken };
                        } catch (error) {
                                throw new ApiError(
                                        500,
                                        "Something went wrong while generating refresh and access token",
                                );
                        }
                };
                
                const registerSeller = asyncHandler(async (req, res) => {
                        const { fullName, email, username, password, gstNumber } = req.body;
                
                        if (
                                [fullName, email, username, password, gstNumber].some(
                                        (field) => field?.trim() === "",
                                )
                        ) {
                                throw new ApiError(400, "All fields are required");
                        }
                
                        const existedUser = await Seller.findOne({
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
                
                        let user;
                        try {
                                user = await Seller.create({
                                        fullName,
                                        avatar: avatar.url,
                                        coverImage: coverImage?.url || "",
                                        email,
                                        password,
                                        gstNumber,
                                        username: username.toLowerCase(),
                                        approved: false,
                                });
                        } catch (error) {
                                console.error("Error creating user in DB:", error);
                                throw new ApiError(500, "Error creating user in database");
                        }
                
                        const createdUser = await Seller.findById(user._id).select(
                                "-password -refreshSessionToken",
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
                
                const loginSeller = asyncHandler(async (req, res) => {
                        const { email, username, password } = req.body;
                
                        if (!username && !email) {
                                throw new ApiError(400, "username or email is required");
                        }
                
                        const user = await Seller.findOne({
                                $or: [{ username }, { email }],
                        });
                
                        if (!user) {
                                throw new ApiError(404, "User does not exist");
                        }
                
                        const isPasswordValid = await user.isPasswordCorrect(password);
                
                        if (!isPasswordValid) {
                                throw new ApiError(401, "Invalid user credentials");
                        }
                
                        const { accessSessionToken, refreshSessionToken } =
                                await generateAccessSessionTokenAndRefreshSessionToken(user._id);
                
                        const loggedInUser = await Seller.findById(user._id).select("-password");
                
                        const options = {
                                httpOnly: true,
                                secure: true,
                                sameSite: "None",
                        };
                
                        return res
                                .status(200)
                                .cookie("refreshSessionToken", refreshSessionToken, options)
                                .cookie("accessSessionToken", accessSessionToken, options)
                                .json(
                                        new ApiResponse(
                                                200,
                                                {
                                                        user: loggedInUser,
                                                        accessSessionToken,
                                                        refreshSessionToken,
                                                },
                                                "User logged In Successfully",
                                        ),
                                );
                });
                
                const refreshAccessSessionToken = asyncHandler(async (req, res) => {
                        const incomingRefreshSessionToken = req.cookies.refreshSessionToken;
                        if (!incomingRefreshSessionToken) {
                                throw new ApiError(401, "Unauthorized Request");
                        }
                
                        try {
                                const decodedToken = Jwt.verify(
                                        incomingRefreshSessionToken,
                                        process.env.REFRESH_TOKEN_SECRET,
                                );
                
                                const user = await Seller.findById(decodedToken?._id);
                                if (!user) {
                                        throw new ApiError(401, "Invalid refresh token");
                                }
                
                                if (incomingRefreshSessionToken !== user.refreshSessionToken) {
                                        throw new ApiError(
                                                401,
                                                "Refresh token is expired or does not match",
                                        );
                                }
                
                                const options = {
                                        httpOnly: true,
                                        secure: true,
                                        sameSite: "None",
                                };
                
                                const { accessSessionToken, refreshSessionToken } =
                                        await generateAccessSessionTokenAndRefreshSessionToken(user._id);
                
                                return res
                                        .status(200)
                                        .cookie("accessSessionToken", accessSessionToken, options)
                                        .cookie("refreshSessionToken", refreshSessionToken, options)
                                        .json(
                                                new ApiResponse(
                                                        200,
                                                        {
                                                                accessSessionToken,
                                                                refreshSessionToken,
                                                        },
                                                        "Refresh token is created successfully",
                                                ),
                                        );
                        } catch (error) {
                                console.error("Error during token refresh:", error);
                                throw new ApiError(
                                        401,
                                        error.message || "Invalid refresh token",
                                );
                        }
                });
                
           


const logOutUser = asyncHandler(async (req, res) => {
        if (!req.seller) {
                return res
                        .status(401)
                        .json(new ApiResponse(401, {}, "Unauthorized"));
        }

        await Seller.findByIdAndUpdate(
                req.seller?._id,
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



const changePassword = asyncHandler(async (req, res) => {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!(confirmPassword === newPassword)) {
                throw new ApiError(404, "password not matching");
        }

        const user = await Seller.findById(req.seller?.id);
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
                                req.seller,
                                "current user fetched succesfully",
                        ),
                );
});

const updateAccountdetail = asyncHandler(async (req, res) => {
        const { fullName, email } = req.body;

        if (!(fullName || email)) {
                throw new ApiError(400, "All feilds are required");
        }
        const updateuser = await Seller.findByIdAndUpdate(
                req.seller?._id,
                {
                        $set: {
                                fullName,
                                email: email,
                        },
                },
                { new: true },
        ).select("-password");
        return res
                .status(200)
                .json(
                        new ApiResponse(
                                200,
                                updateuser,
                                "Account details updated succesfully",
                        ),
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
        const currentUser = await Seller.findById(req.seller?._id).select(
                "-password",
        );

        if (currentUser && currentUser.avatar) {
                await deleteFromCloudinary(currentUser.avatar);
        }

        const updateuser = await Seller.findByIdAndUpdate(
                req.seller?._id,
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
export {
        registerSeller,
        loginSeller,
        logOutUser,
    refreshAccessSessionToken,
        getCurrentUser,
        changePassword,
        updateAccountdetail,
        updateUserAvatar,
};