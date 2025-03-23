import { Router } from "express";
// import {
//         logOutUser,
//         loginUser,
//         refreshAccessToken,
//         register,
//         updateAccountdetail,
//         updateUserAvatar,
//         changePassword,
// } from "../controllers/user.controller.js";
import { registerSeller,loginSeller,logOutUser,updateAccountdetail,updateUserAvatar,changePassword,refreshAccessSessionToken } from "../controllers/seller.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

import { isSellerAutenticated ,verifySeller } from "../middlewares/auth.middleware.js";

const sellerRouter = Router();



sellerRouter.route("/register").post(
        upload.fields([
                {
                        name: "avatar",
                        maxCount: 1,
                },
                {
                        name: "coverImage",
                        maxCount: 1,
                },
        ]),
      
        registerSeller,
);

sellerRouter.route("/login").post(isSellerAutenticated,loginSeller);

sellerRouter.route("/logout").post(verifySeller, logOutUser);

sellerRouter.route("/updateAvatar").post(upload.single("avatar"), updateUserAvatar);
sellerRouter.route("/updateUserdetail").post(verifySeller, updateAccountdetail);
sellerRouter.route("/changePassword").post(verifySeller, changePassword);

// Secured Routes

sellerRouter.route("/sellerRefresh-token").post(verifySeller, refreshAccessSessionToken);
export default sellerRouter;

