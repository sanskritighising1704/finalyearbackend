import express from "express";
import { createOrderAndInitiatePayment, paymentStatus } from "../controllers/e-sewaPayment.js";
import { protect } from "../middleware/auth.js";


const router = express.Router();

router.post("/initiate-payment",protect, createOrderAndInitiatePayment);

router.post("/payment-status",protect, paymentStatus);

export default router;