import express from "express";
const router = express.Router();
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import { protect, admin } from "../middleware/auth.js";
import upload from "../utils/upload.js";

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin only routes — upload.array("images", 5) parses multipart/form-data so req.body is populated
router.post("/", protect, admin, upload.array("images", 5), createProduct);
router.put("/:id", protect, admin, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
