import express from 'express';
import {
  createRecycling,
  getAllRecycling,
  getRecyclingById,
  updateRecycling,
  deleteRecycling
} from '../controllers/recycle.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { verifyRole } from '../middlewares/role.middleware.js';

const router = express.Router();

router.route("/create").post(verifyJWT ,createRecycling);
router.route("/get").get(verifyJWT ,verifyRole(["admin", "superadmin"]) , getAllRecycling);
router.route("/update/:id").post(verifyJWT ,verifyRole(["admin", "superadmin"]) , updateRecycling);

router.get('/:id', getRecyclingById);

router.delete('/:id', deleteRecycling);

export default router;
