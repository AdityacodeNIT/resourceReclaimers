import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsynchHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Jwt from "jsonwebtoken";



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


const registerUser=asyncHandler(async(req,res)=>{
const {fullName,username,email,password}=req.body;

if (
    [fullName, email, username, password].some(
            (field) => field?.trim() === "",
    )
) {
    throw new ApiError(400, "All fields are required");
}
console.log(username);

const existedUser = await User.findOne({
    $or: [{ username }, { email }],
});

if (existedUser) {
    throw new ApiError(
            409,
            "User with email or username already exists",
    );
}

let user;
try {
    user = await User.create({
            fullName,
            email,
            password,
            username,
    });
} catch (error) {
    console.error("Error creating user in DB:", error);
    throw new ApiError(500, "Error creating user in database");
}
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


})

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
            throw new ApiError(401, "Invalid user credentials");
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
    const incomingrefreshToken = req.cookies.refreshToken;
    if (!incomingrefreshToken) {
            throw new ApiError(401, "Unauthorized Request");
    }

    try {
            const decodedToken = Jwt.verify(
                    incomingrefreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
            );

            const user = await User.findById(decodedToken?._id);
            if (!user) {
                    throw new ApiError(401, "Invalid refresh token");
            }

            console.log(incomingrefreshToken);
            console.log(user.refreshToken);

            if (incomingrefreshToken !== user.refreshToken) {
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

            const { accessToken, refreshToken } =
                    await generateAccessAndRefreshtoken(user._id);

            return res
                    .status(200)
                    .cookie("accessToken", accessToken, options)
                    .cookie("refreshToken", refreshToken, options)
                    .json(
                            new ApiResponse(
                                    200,
                                    {
                                            accessToken,
                                            refreshToken: refreshToken,
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
            throw new ApiError(400, "All feilds are required");
    }
    const updateuser = await User.findByIdAndUpdate(
            req.user?._id,
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


export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    getCurrentUser,
    changePassword,
    updateAccountdetail,
   
};