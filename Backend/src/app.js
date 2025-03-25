import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
        cors({
                origin: process.env.CORS_ORIGIN,
                credentials: true,
            
        }),
);

app.use(express.json({ limit: "2mb" }));

app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use(express.static("public"));
app.use(cookieParser());

//routes
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import addressRouter from "./routes/address.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import Reviewrouter from "./routes/review.routes.js";


import shiprouter from "./routes/shiprocket.routes.js";
import interactionRouter from "./routes/interaction.routes.js";
import Subscriberouter from "./routes/subscriber.routes.js";
import sellerRouter from "./routes/seller.routes.js";
import refurbishRouter from "./routes/refurbished.routes.js";



//routes Decleration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/seller", sellerRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v2/payments", paymentRouter);
app.use("/api/v2/feedback", Reviewrouter);
app.use("/shiprocket", shiprouter);
app.use("/api/activity",interactionRouter);
app.use("/api/v1", Subscriberouter);
app.use("/api/v1/refurbished",refurbishRouter);



app.get("/api/getKey", (req, res) =>
        res.status(200).json({ key: process.env.RAZORPAY_API_KEY }),
);
export { app };
