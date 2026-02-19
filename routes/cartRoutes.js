import express from "express";
const router = express.Router();
import {
  addToCart,
  getCartByUserId,
  updateCartItem,
  removeItemFromCart,
  removeAllFromCart,
} from "../controllers/cartControllers.js";
import { protect } from "../middleware/auth.js";

// All cart routes require authentication
router.use(protect);

router.post("/add", addToCart);
router.get("/", getCartByUserId);
router.put("/update", updateCartItem);
router.delete("/item/:productId", removeItemFromCart);
router.delete("/clear", removeAllFromCart);

export default router;
