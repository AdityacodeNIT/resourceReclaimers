import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addAddress, getAddress } from "../controllers/address.controller.js";

const addressrouter = Router();

addressrouter.route("/addAddress").post(verifyJWT, addAddress);
addressrouter.route("/getAddress").get(verifyJWT, getAddress);

export default addressrouter;
