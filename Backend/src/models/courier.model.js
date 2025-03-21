import mongoose from "mongoose";

const courierSchema = new mongoose.Schema({
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Delivery person
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  status: { type: String, enum: ["assigned", "picked-up", "delivered"], default: "assigned" },
  pickupDate: { type: Date },
  deliveryDate: { type: Date }
});

const Courier = mongoose.model("Courier", courierSchema);
export default Courier;
