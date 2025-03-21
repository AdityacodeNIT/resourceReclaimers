import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsynchHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
        try {
                const token =
                        req.cookies.accessToken ||
                        req
                                .header("Authorization")
                                ?.replace("Bearer ", "")
                                .trim();

                if (!token) {
                        throw new ApiError(401, "Token is not present");
                }

                const decodedToken = jwt.verify(
                        token,
                        process.env.ACCESS_TOKEN_SECRET,
                );

                const user = await User.findById(decodedToken._id).select(
                        "-password -refreshToken",
                );

                if (!user) {
                        throw new ApiError(401, "Invalid Access Token");
                }

                req.user = user; // Attach user to req
                next();
        } catch (error) {
                console.error("JWT verification error:", error.message);
                throw new ApiError(401, "Invalid Access Token");
        }
});

export const isAuthenticated = asyncHandler(async (req, res, next) => {
        try {
            const token =
                req.cookies?.accessToken ||
                req.header("Authorization")?.replace("Bearer ", "").trim();
    
            if (token) {
          
                const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
              
                const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    
                if (user) {
                    return res.status(400).json({ message: "You are already logged in." });
                }
            }
    
            next();
        } catch (error) {
         
            next();
        }
    });
