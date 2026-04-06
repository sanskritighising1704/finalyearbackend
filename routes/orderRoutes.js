import express from "express";
const router = express.Router();

import {
  createOrder,
  getOrderByUserId,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderControllers.js";

import { protect } from "../middleware/auth.js";

// All routes protected
router.use(protect);

router.post("/create", createOrder);
router.get("/", getOrderByUserId);
router.get("/:orderId", getOrderById);

// ✅ This matches controller FIX
router.put("/:orderId", updateOrderStatus);

export default router;