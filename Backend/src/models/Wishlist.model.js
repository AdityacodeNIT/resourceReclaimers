import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema(
        {
                userId: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
                },
                items: [
                        {
                                productId: {
                                        type: Schema.Types.ObjectId,
                                        required: true,
                                        ref: "Product",
                                        unique: true,
                                },
                                name: { type: String },
                                quantity: { type: Number },
                                price: { type: Number },
                        },
                ],
        },
        { timestamps: true },
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
