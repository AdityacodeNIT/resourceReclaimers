import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
        {
                rating: {
                        type: Number,
                        required: true,
                },
                productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: "Product",
                },

                description: {
                        type: String,
                        
                },
                userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: "User",
                },
        },
        { timestamps: true },
);

reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

export const Review = mongoose.model("reviewSchema", reviewSchema);
