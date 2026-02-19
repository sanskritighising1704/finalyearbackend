import express from "express";
const router = express.Router();
import {
  createOrder,
  getOrderByUserId,
  getOrderById,
} from "../controllers/orderControllers.js";
import { protect } from "../middleware/auth.js";
// All order routes require authentication
router.use(protect);

router.post("/create", createOrder);
router.get("/", getOrderByUserId);
router.get("/:orderId", getOrderById);

export default router;
