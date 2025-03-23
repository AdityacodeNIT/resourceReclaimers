import { Router } from "express";

import { review, averageReview } from "../controllers/review.controllers.js";

const Reviewrouter = Router();

Reviewrouter.route("/review").post(review);
Reviewrouter.route("/average").post(averageReview);

export default Reviewrouter;
