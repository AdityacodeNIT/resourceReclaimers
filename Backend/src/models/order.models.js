import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
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
                                },
                                sellerId: {
                                        type: Schema.Types.ObjectId,
                                        ref: "User",
                                    },

                                quantity: { type: Number },
                        },
                ],

                // Shiprocket-related fields
                orderId: {
                        type: Schema.Types.ObjectId,
                        required: true,
                        ref: "Product",
                },

                shippingDetails: {
                        customerName: {
                                type: Schema.Types.ObjectId,
                                ref: "User",
                                required: true,
                        },
                        lastName: {
                                type: Schema.Types.ObjectId,
                                ref: "User",
                                required: true,
                        },
                        address: {
                                type: Schema.Types.ObjectId,
                                ref: "Address",
                                required: true,
                        },
                        // Default to India for Shiprocket.
                        email: { type: String, required: true },
                },
                shippingIsBilling: {
                        type: Boolean,
                        default: true, // Assume shipping and billing addresses are the same by default.
                },
                paymentMethod: {
                        type: String,
                        enum: ["Prepaid", "COD"],
                        default: "Prepaid",
                },
                subTotal: {
                        type: Number,
                        required: true, // Total cost before shipping
                },
                dimensions: {
                        length: { type: Number, required: true }, // in cm
                        breadth: { type: Number, required: true }, // in cm
                        height: { type: Number, required: true }, // in cm
                        weight: { type: Number, required: true }, // in kg
                },
                pickupLocation: {
                        type: String,
                        required: true, // Must match registered Shiprocket location
                },
                status: {
                        type: String,
                        enum: ["PENDING", "CANCELLED", "DELIVERED"],
                        default: "PENDING",
                },
                shiprocketOrderId: {
                        type: String, // Shiprocket's order ID (returned after order creation)
                },
                shiprocketTrackingId: {
                        type: String, // Shiprocket's tracking ID for the shipment
                },
        },
        { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
