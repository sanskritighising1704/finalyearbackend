import Review from '../models/Review.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createReview = async (req, res) => {
  try {
    const { orderId, productId, rating, comment } = req.body;
    const userId = req.user._id;

    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.orderStatus !== 'delivered') {
      return res.status(400).json({ message: 'Can only review delivered orders' });
    }

    // ✅ Fix: use item.product instead of item.productId
    const itemExists = order.items.some(
      (item) => item.product.toString() === productId
    );
    if (!itemExists) {
      return res.status(400).json({ message: 'Product not in this order' });
    }

    const existing = await Review.findOne({ user: userId, product: productId, order: orderId });
    if (existing) {
      return res.status(400).json({ message: 'Already reviewed this product' });
    }

    const review = await Review.create({
      user: userId,
      product: productId,
      order: orderId,
      rating,
      comment,
    });

    const allReviews = await Review.find({ product: productId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await Product.findByIdAndUpdate(productId, {
      rating: avgRating,
      numReviews: allReviews.length
    });

    res.status(201).json({ message: 'Review submitted', review });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Already reviewed this product' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getReviewedProducts = async (req, res) => {
  try {
    const reviews = await Review.find({
      order: req.params.orderId,
      user: req.user._id
    }).select('product rating comment');

    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};