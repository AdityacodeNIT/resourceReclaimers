import mongoose from "mongoose";

const aiReportSchema = new mongoose.Schema({
  missionId: { type: mongoose.Schema.Types.ObjectId, ref: "Mission", required: true },
  generatedSummary: { type: String, required: true },
  aiConfidenceScore: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const AIReport= mongoose.model("AIReport", aiReportSchema);
