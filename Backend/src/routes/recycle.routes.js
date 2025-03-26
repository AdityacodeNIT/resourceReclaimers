import express from 'express';
import {
  createRecycling,
  getAllRecycling,
  getRecyclingById,
  updateRecycling,
  deleteRecycling
} from '../controllers/recycle.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route("/create").post(verifyJWT ,createRecycling);
router.get('/', getAllRecycling);
router.get('/:id', getRecyclingById);
router.put('/:id', updateRecycling);
router.delete('/:id', deleteRecycling);

export default router;
