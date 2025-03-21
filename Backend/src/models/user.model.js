import mongoose ,{Schema} from "mongoose";
import argon2 from "argon2"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new Schema(
    {
            username: {
                    type: String,
                    required: [true, "UserName is Required"],
                    unique: true,
                    lowercase: true,
                    trim: true,
                    index: true,
            },
            email: {
                    type: String,
                    required: true,
                    unique: true,
                    lowercase: true,
                    trim: true,
            },
            fullName: {
                    type: String,
                    required: true,
                    trim: true,
                    index: true,
            },
            password: {
                    type: String,
                    required: [true, "Password is required"],
            },
            refreshToken: {
                    type: String,
                    trim:true,
            },
            isAdmin: {
                    type: Boolean,
                    default: false,
            },
    },
    { timestamp: true },
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await argon2.hash(this.password, {
        type: argon2.argon2id, 
        memoryCost: 2 ** 16,  
        timeCost: 4,          
        parallelism: 2        
    });

    
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await argon2.verify(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
            {
                    _id: this._id,
                    email: this.email,
                    username: this.username,
                    fullName: this.fullName,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            },
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
            {
                    _id: this._id,
                    email: this.email,
            },
            process.env.REFRESH_TOKEN_SECRET,
            
            {
                    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
            },
    );
};

export const User = mongoose.model("User", userSchema);
