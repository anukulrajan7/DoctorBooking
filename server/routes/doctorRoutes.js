// routes/doctorRoutes.js
import express from "express";
import { verifyToken } from "../middlware/authMiddleware.js";
import {
  updateStatus,
  getOnlineDoctors,
} from "../controllers/doctorController.js";

const router = express.Router();

router.patch("/update-status", verifyToken, updateStatus);
router.get("/online-doctors", verifyToken, getOnlineDoctors);

export default router;
