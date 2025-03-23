import { Router } from "express";

import {
        wishlistedItems,
        retrieveWishlisted,
        removeWishlistedItem,
} from "../controllers/wishlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const WishListRouter = Router();

WishListRouter.route("/addWishlist").post(wishlistedItems);

WishListRouter.route("/Wishlists/:userId").get(retrieveWishlisted);

WishListRouter.route("/removeWishlistItem").post(verifyJWT,removeWishlistedItem);

export default WishListRouter;
