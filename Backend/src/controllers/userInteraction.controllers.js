import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserInteraction } from "../models/userInteraction.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Jwt from "jsonwebtoken";


export const getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;

    const interactions = await UserInteraction.find({ userId });
    if (!interactions.length) {
      return res.status(404).json({ message: "No user interactions found" });
    }

  
    const response = await axios.get(`http://127.0.0.1:5001/recommend/${userId}`);
    const recommendedProductIds = response.data.recommended_products;

    // 🔹 Fetch product details from MongoDB
    const recommendedProducts = await Product.find({ _id: { $in: recommendedProductIds } });

    res.json({ userId, recommendedProducts });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
