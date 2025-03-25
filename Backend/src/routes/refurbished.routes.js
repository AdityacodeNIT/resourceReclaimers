import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addBuyProduct,getAllBuyProducts,getPendingBuyProducts,updateBuyProduct,deleteBuyProduct, getProducts } from "../controllers/refurbished.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";

const router = Router();

router.route("/addProduct").post(
    verifyJWT,
    //verifyRole(["seller", "superadmin"]),
    upload.fields([
        { name: "originalPriceProof", maxCount: 1 }, 
        { name: "productImages", maxCount: 5 }       
    ]),
    addBuyProduct
);


router.route("/updateProduct/:id").post(
        verifyJWT,
        verifyRole(["seller", "superadmin"]),
        upload.single("ProductImage"),
        updateBuyProduct,
);

router.delete(
        "/deleteProduct/:id",
        verifyJWT,
        verifyRole(["seller", "superadmin"]),
        deleteBuyProduct
    );

router.route("/getProduct").get(verifyJWT,getProducts);

router.route("/getAllProducts").get(verifyJWT, verifyRole(["admin", "superadmin"]),getAllBuyProducts)

export default router;
