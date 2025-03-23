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

                message: {
                        type: String,
                },
        },
        { timestamps: true },
);

export const Review = mongoose.model("reviewSchema", reviewSchema);
