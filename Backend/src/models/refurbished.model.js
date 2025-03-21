import mongoose from "mongoose";

const refurbishSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  technician: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assigned technician
  conditionBefore: { type: String, required: true },
  conditionAfter: { type: String },
  cost: { type: Number, required: true },
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  completedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const Refurbish = mongoose.model("Refurbish", refurbishSchema);
export default Refurbish;
