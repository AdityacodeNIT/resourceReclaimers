import { asyncHandler } from "../utils/AsynchHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Mission } from "../models/mission.model.js";

// 📌 1. Create a new mission
export const createMission = asyncHandler(async (req, res) => {
  const { title, description, assignedTo, deadline } = req.body;

  if (!title || !description || !assignedTo) {
    throw new ApiError(400, "Title, description, and assigned user are required");
  }

  const mission = await Mission.create({ title, description, assignedTo, deadline });

  res.status(201).json(new ApiResponse(201, mission, "Mission created successfully"));
});

// 📌 2. Get all missions
export const getAllMissions = asyncHandler(async (req, res) => {
  const missions = await Mission.find().populate("assignedTo", "fullName email");

  res.status(200).json(new ApiResponse(200, missions, "Missions fetched successfully"));
});

// 📌 3. Get a single mission by ID
export const getMissionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const mission = await Mission.findById(id).populate("assignedTo", "fullName email");

  if (!mission) {
    throw new ApiError(404, "Mission not found");
  }

  res.status(200).json(new ApiResponse(200, mission, "Mission fetched successfully"));
});

// 📌 4. Update mission details
export const updateMission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, status, deadline } = req.body;

  const mission = await Mission.findByIdAndUpdate(
    id,
    { $set: { title, description, status, deadline } },
    { new: true }
  );

  if (!mission) {
    throw new ApiError(404, "Mission not found");
  }

  res.status(200).json(new ApiResponse(200, mission, "Mission updated successfully"));
});

// 📌 5. Delete a mission
export const deleteMission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const mission = await Mission.findByIdAndDelete(id);

  if (!mission) {
    throw new ApiError(404, "Mission not found");
  }

  res.status(200).json(new ApiResponse(200, {}, "Mission deleted successfully"));
});
