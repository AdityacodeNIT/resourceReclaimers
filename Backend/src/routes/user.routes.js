import { Router } from "express";
import {
        logOutUser,
        loginUser,
        refreshAccessToken,
        registerUser,
        updateAccountdetail,
        updateUserAvatar,
        changePassword,
} from "../controllers/user.controller.js";

import { updateUserRole, userlist,deleteUser } from "../controllers/admin.controllers.js";

import { verifyRole } from "../middlewares/role.middleware.js";

import { upload } from "../middlewares/multer.middleware.js";

import { isAuthenticated, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();




router.route("/register").post(
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
        isAuthenticated,
        registerUser,
);

router.route("/login").post(isAuthenticated,loginUser);

router.route("/logout").post(verifyJWT, logOutUser);

router.route("/updateAvatar").post(upload.single("avatar"), updateUserAvatar);
router.route("/updateUserdetail").post(verifyJWT, updateAccountdetail);
router.route("/changePassword").post(verifyJWT, changePassword);
// Secured Routes



router.route("/refresh-token").post(verifyJWT, refreshAccessToken);

router.put("/updateRole", verifyRole, verifyRole("superadmin"), updateUserRole);

router.route("/deleteUser/:id").delete(verifyJWT, verifyRole("superadmin"), deleteUser);

router.route("/userList").get(verifyJWT, verifyRole("superadmin"), userlist);

router.route("/updateUserPost/:id").post(verifyJWT, verifyRole("superadmin"), updateUserRole);






export default router;
