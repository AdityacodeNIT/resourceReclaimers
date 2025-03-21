import mongoose, {Schema} from "mongoose";

const recyclingSchema = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  recyclerCompany: { type: String, required: true }, // Name of the recycling industry
  amountReceived: { type: Number, required: true }, // Money earned from the recycled item
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  recycledAt: { type: Date }, // Date when recycling was completed
  createdAt: { type: Date, default: Date.now }
});

const Recycling = mongoose.model("Recycling", recyclingSchema);

export {Recycling};
