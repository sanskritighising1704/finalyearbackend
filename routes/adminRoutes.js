import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/adminControllers.js";
import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminControllers.js";
import { getDashboardStats } from "../controllers/adminControllers.js";
import { protect, admin } from "../middleware/auth.js";

// All admin routes require authentication and admin role
router.use(protect, admin);

// User management
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);

// Order management
router.get("/orders", getAllOrders);
router.put("/orders/:id", updateOrderStatus);

// Dashboard
router.get("/stats", getDashboardStats);

export default router;
