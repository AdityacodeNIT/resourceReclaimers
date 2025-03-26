import mongoose, { Schema } from "mongoose";

const recyclingSchema = new Schema({
  warehouseName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },

  adminName: { type: String, required: true },
  adminContact: { type: String, required: true },
  adminEmail: { type: String, required: true },

  capacity: { type: Number, required: true }, // Total warehouse capacity
  currentWasteVolume: { type: Number, required: true }, // Current waste stored

  wasteType: { type: String, required: true },
  amountReceived: { type: Number, required: true },
  amountCrushed: { type: Number, required: true },
  amountSentToIndustry: { type: Number, required: true },

  industryName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  revenueReceived: { type: Number, required: true },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Recycling = mongoose.model("Recycling", recyclingSchema);
