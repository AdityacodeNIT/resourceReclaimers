import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema(
        {
                userId: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
                },
                firstName: {
                        type: String,
                        required: true,
                },
                lastName: {
                        type: String,
                        required: true,
                },
                streetAddress: {
                        type: String,
                        required: true,
                },
                city: {
                        type: String,
                        required: true,
                },
                state: {
                        type: String,
                        required: true,
                },
                country: {
                        type: String,
                        required: true,
                        default: "India",
                },
                postalCode: {
                        type: String,
                        required: true,
                },

                phoneNumber: {
                        type: String,
                        required: true,
                },
                alternateNumber: {
                        type: String,
                        required: true,
                },
        },

        { timestamps: true },
);

export const Address = mongoose.model("Address", AddressSchema);
