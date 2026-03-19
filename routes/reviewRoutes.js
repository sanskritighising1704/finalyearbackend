import express from 'express';
import { createReview, getReviewedProducts, getProductReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';  // ✅ fixed

const router = express.Router();

router.post('/', protect, createReview);
router.get('/order/:orderId', protect, getReviewedProducts);
router.get('/product/:productId', getProductReviews);

export default router;