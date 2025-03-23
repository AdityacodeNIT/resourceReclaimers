import mongoose,{Schema} from "mongoose";


const UserInteractionSchema = new Schema(
    {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}
);

export const UserInteraction = mongoose.model("UserInteraction", UserInteractionSchema);
