import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Helper function to extract token from request
const getTokenFromRequest = (req) => {
    return req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();
};

// Middleware to verify JWT and attach user to request
export const verifyJWT = asyncHandler(async (req, _, next) => {
    const token = getTokenFromRequest(req);

    if (!token) {
        throw new ApiError(401, "Token is missing");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid token");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        throw new ApiError(401, "Invalid or expired token");
    }
});

// Middleware to check if the user is already authenticated
export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = getTokenFromRequest(req);

    if (!token) {
        return next(); // No token = user is not logged in, proceed
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id).select("-password -refreshToken");

        if (user) {
            return res.status(409).json({ message: "Already logged in." });
        }
    } catch (error) {
        // Ignore token errors and proceed
    }

    next();
});
