import { ObjectId } from "mongodb"; // Ensure ObjectId is imported
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Review } from "../models/review.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const review = asyncHandler(async (req, res) => {
        const { rating, productId, description } = req.body;

        const userId = req.user._id;
        const reviews = await Review.create({ rating, productId,description,userId });

        return res.status(201).json(new ApiResponse(200, reviews));
});

const averageReview = asyncHandler(async (req, res) => {
        const { productId } = req.body;
  
        const objectId = new ObjectId(productId);
        const result = await Review.aggregate([
                {
                        $match: { productId: objectId },
                },
                {
                        $group: {
                                _id: "$productId",
                                averageRating: { $avg: "$rating" },
                                count: { $sum: 1 },
                        },
                },
        ]);
        // Return the average rating and the total count
        const averageRating = result.length > 0 ? result[0].averageRating : 0;
        const count = result.length > 0 ? result[0].count : 0;
        return res.json({ averageRating, count });
});

const getReview = asyncHandler(async (req, res) => {
        const id = req.params.id;
      
        const reviews = await Review.find({ productId: new ObjectId(id) }).populate(
          "userId",
          "fullName"
        );
      
        if (!reviews.length) {
          throw new ApiError(404, "No reviews found");
        }
      
        res.json(reviews);
      });

export { review, averageReview,getReview };
