//require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";




connectDB()
        .then(() => {
                app.on("error", (error) => {
        
                        throw error;
                });
                app.listen(process.env.PORT || 8000, () => {
                        console.log(
                                `0|Server is listeninig at port :${process.env.PORT}`,
                        );
                });
        })
        .catch((err) => {
                console.log("MONGODB ERROR", err);
        });
