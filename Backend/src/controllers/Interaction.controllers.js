import dotenv from "dotenv";
dotenv.config(); 

import { response } from "express";
import { UserInteraction } from "../models/userInteraction.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.models.js";

import axios from "axios";

export const saveUserInteraction = asyncHandler(async (req, res) => {
  const { action, productId } = req.body;

  if (!req.user || !productId || !action) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // 🔹 Save Interaction in MongoDB
  const interaction = new UserInteraction({
    userId: req.user._id,
    productId,
    action,
  });

  await interaction.save();

  // 🔹 Send Data to Python Model for Training
  try {
    const response=await axios.post(`${process.env.PYTHON_API_KEY}/train`, {
      userId: req.user._id,
      productId,
    });
    console.log("Response from Python Model:", response.data);
  } catch (error) {
    console.error("Error training model:", error.message);
  }

  console.log("User Interaction saved and model trained!",response.data);

  res.status(201).json({ message: "User interaction saved and model trained!" });
});



export const getUserRecommendations = asyncHandler(async (req, res) => {
  const userId = req.user._id; 

  // 🔹 Fetch recommendations from Python API
  try {
    
    const response = await axios.get(`${process.env.PYTHON_API_KEY}/recommend/${userId}`);
    const recommendedProductIds = response.data.recommended_products;

    // 🔹 Fetch product details from MongoDB
    const recommendedProducts = await Product.find({ _id: { $in: recommendedProductIds } }).limit(5);



    res.json(recommendedProducts);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

