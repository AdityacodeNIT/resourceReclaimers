import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
        addProduct,
        WritingProduct,
        ReusableProduct,
        FillingProduct,
        PaperProduct,
        DeskSupplies,
        getTrendingProduct,
        getProduct,
        searchresult,
        deleteProduct,
        updateProduct,
        getSellerProduct,
} from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";

const router = Router();

router.route("/addProduct").post(
        verifyJWT,
        verifyRole(["seller", "superadmin"]),
        upload.single("ProductImage"),

        addProduct,
);

router.route("/updateProduct/:id").post(
        verifyJWT,
        verifyRole(["seller", "superadmin"]),
        upload.single("ProductImage"),
        updateProduct,
);

router.delete(
        "/deleteProduct/:id",
        verifyJWT,
        verifyRole(["seller", "superadmin"]),
        deleteProduct
    );

router.route("/manageProduct").get(verifyJWT,verifyRole(["seller","superadmin"]),getSellerProduct);



router.route("/WritingProduct").get(WritingProduct);
router.route("/PaperProduct").get(PaperProduct);
router.route("/ReusableProduct").get(ReusableProduct);
router.route("/FillingProduct").get(FillingProduct);
router.route("/DeskSupplies").get(DeskSupplies);
router.route("/getProduct").get(getProduct);
router.route("/getTrendingProduct").get(getTrendingProduct);

router.route("/searchProduct").post(searchresult);

export default router;
