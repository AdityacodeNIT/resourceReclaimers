import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { razorpay } from "../utils/razorPay.js";
import crypto from "crypto";
const checkout = asyncHandler(async (req, res) => {
  try {
    const { amount } = req.body;

 
    const options = {
      amount: amount * 100, // Razorpay expects the amount in paise.
      currency: "INR",
      // Auto-capture the payment
    };
    const order = await razorpay.orders.create(options);
  

    // Redirect the user to the Razorpay payment page
    res.status(200).json({ success: true, order });
  } 
  catch (error) {
    console.error(error);
    throw new ApiError(500, "Error creating order");
  }
});

const paymentCallback = asyncHandler(async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
      
    if (!(razorpay_order_id || razorpay_payment_id || razorpay_signature)) {
      throw new ApiError(400, "unavialable");
    }  

    // Fetch the secret from your configuration or environment variables
    const secret = process.env.RAZORPAY_API_SECRET;

    // Generate the signature
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Compare the generated signature with the provided signature
    if (generated_signature !== razorpay_signature) {
      return res.status(400).send("Invalid payment callback");
    }


    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Error handling payment callback");
  }
});
const transactionVerification = asyncHandler(async (req, res) => {
  try {
    const orderId = req.body.payload.payment.entity.order_id;
    const paymentId = req.body.payload.payment.entity.id;

    if (!(orderId || paymentId)) {
      throw new ApiError(500, "not secure");
    }



    res.status(200).send("Webhook received successfully");
  } catch (error) {
   
    throw new ApiError(500, "Error verifying transaction");
  }
});

export { checkout, paymentCallback, transactionVerification };
