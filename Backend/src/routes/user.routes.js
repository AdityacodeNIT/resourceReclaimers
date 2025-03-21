import { Router } from "express";
import {
        logOutUser,
        loginUser,
        refreshAccessToken,
        registerUser,
        updateAccountdetail,
        changePassword,
} from "../controllers/user.controller.js";

import { isAuthenticated, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();




router.route("/register").post(
        isAuthenticated,
        registerUser,
);

router.route("/login").post(isAuthenticated,loginUser);

router.route("/logout").post(verifyJWT, logOutUser);

router.route("/updateUserdetail").post(verifyJWT, updateAccountdetail);
router.route("/changePassword").post(verifyJWT, changePassword);
// Secured Routes

router.route("/refresh-token").post(verifyJWT, refreshAccessToken);
export default router;
