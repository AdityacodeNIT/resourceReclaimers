import { Router } from "express";
import {
  checkout,
  paymentCallback,
  transactionVerification,
} from "../controllers/payment.controller.js";
const paymentRouter = Router();

paymentRouter.route("/paid").post(checkout);

paymentRouter.route("/paymentcallback").post(paymentCallback);

paymentRouter.route("/paymentVerification").post(transactionVerification);
export default paymentRouter;
