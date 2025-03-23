import { asyncHandler } from "../utils/asyncHandler.js";
import { Wishlist } from "../models/Wishlist.model.js";
import mongoose from "mongoose"; // Ensure you import mongoose

const wishlistedItems = asyncHandler(async (req, res) => {
        const { userId, items } = req.body; // Expecting items to be an array
        try {
                let wishlist = await Wishlist.findOne({ userId });

                // Create a new wishlist if it doesn't exist
                if (!wishlist) {
                        // Create new items array with distinct objects
                        const newItems = items.map((newItem) => ({
                                productId: newItem.productId,
                                quantity: newItem.quantity || 1, // Default quantity if not provided
                                _id: new mongoose.Types.ObjectId(), // Generate a new ID for each item
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                                __v: 0,
                        }));

                        // Create and save the new wishlist
                        wishlist = new Wishlist({ userId, items: newItems });
                        await wishlist.save();
                        return res.status(200).send(wishlist);
                }

                // If the wishlist exists, loop through each incoming item
                for (const newItem of items) {
                        // Check if the item already exists based on productId
                        const itemExists = wishlist.items.some(
                                (item) =>
                                        item.productId.toString() ===
                                        newItem.productId.toString(),
                        );

                        // If the item does not exist, create a new object and add it
                        if (!itemExists) {
                                const itemToAdd = {
                                        productId: newItem.productId,
                                        quantity: newItem.quantity || 1, // Default quantity if not provided
                                        _id: new mongoose.Types.ObjectId(), // Generate a new ID for this item
                                        createdAt: new Date().toISOString(),
                                        updatedAt: new Date().toISOString(),
                                        __v: 0,
                                };

                                // Add the new item to the wishlist
                                wishlist.items.push(itemToAdd);
                        } 
                }

                // Save the updated wishlist after adding new items
                const updatedWishlist = await wishlist.save();
                res.status(200).send(updatedWishlist);
        } catch (error) {
                res.status(500).send(error);
        }
});

const retrieveWishlisted = asyncHandler(async (req, res) => {
        try {
                const orders = await Wishlist.find({
                        userId: req.params.userId,
                })
                        .populate(
                                "items.productId",
                                "name price ProductImage description",
                        )
                        .sort({ createdAt: 1 });
                res.status(200).send(orders);
        } catch (error) {
                res.status(500).send(error);
        }
});

const removeWishlistedItem = asyncHandler(async (req, res) => {
        try {
            const { productId } = req.body;
         
    
    
            const objectIdProductId = new mongoose.Types.ObjectId(productId);
    
            // Remove the item directly from the database using $pull
            const result = await Wishlist.findOneAndUpdate(
                { userId: req.user._id },
                { $pull: { items: {_id: objectIdProductId } } }, // Remove item
                { new: true } // Return the updated document
            );
    
            if (!result) {
                return res.status(404).json({ message: "Wishlist not found" });
            }
    
            res.status(200).json({ message: "Item removed successfully" });
    
        } catch (error) {
            console.error("Error removing item:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    

export { wishlistedItems, retrieveWishlisted, removeWishlistedItem };
