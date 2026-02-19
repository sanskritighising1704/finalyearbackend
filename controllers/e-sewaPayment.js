import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { generateHmacSha256Hash } from "../utils/helper.js";
import axios from "axios";

const createOrderAndInitiatePayment = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, shippingPrice, taxPrice, paymentGateway } = req.body;
    const userId = req.user._id;

    // Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Validate stock for all items
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.product.name}`
        });
      }
    }

    // Prepare order items
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.price
    }));

    // Calculate total
    const totalPrice = cart.totalPrice;
    const totalAmount = totalPrice + (shippingPrice || 0) + (taxPrice || 0);

    // Create order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentGateway,
      totalPrice,
      shippingPrice: shippingPrice || 0,
      taxPrice: taxPrice || 0,
      totalAmount,
      paymentStatus: 'pending'
    });

    // Update product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity }
      });
    }

    // Clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    // Populate order details
    await order.populate('items.product');
    await order.populate('user');

    // If payment method is cash on delivery, return order without payment URL
    if (paymentMethod === 'cod' || paymentMethod === 'cash') {
      return res.status(201).json({
        success: true,
        message: 'Order created successfully',
        order,
        paymentRequired: false
      });
    }

    // Initiate payment for eSewa
    if (paymentGateway === "esewa") {
      const amount = totalAmount.toString();
      
      const paymentData = {
        amount,
        failure_url: process.env.FAILURE_URL,
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: process.env.ESEWA_MERCHANT_ID,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url:`${process.env.SUCCESS_URL}/${order._id}`,
        tax_amount: "0",
        total_amount: amount,
        transaction_uuid: order._id.toString(),
      };

      const data = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
      const signature = generateHmacSha256Hash(data, process.env.ESEWA_SECRET);

      const paymentConfig = {
        url: process.env.ESEWA_PAYMENT_URL,
        data: { ...paymentData, signature },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseHandler: (response) => response.request?.res?.responseUrl,
      };

      // Make payment request for eSewa
      const payment = await axios.post(paymentConfig.url, paymentConfig.data, {
        headers: paymentConfig.headers,
      });

      const paymentUrl = paymentConfig.responseHandler(payment);
      if (!paymentUrl) {
        // If payment initiation fails, mark order as failed
        order.paymentStatus = 'FAILED';
        await order.save();
        throw new Error("Payment URL is missing in the response");
      }

      return res.status(201).json({
        success: true,
        message: 'Order created successfully',
        order,
        paymentRequired: true,
        paymentUrl,
      });
    } else {
      return res.status(400).json({ message: 'Invalid payment gateway. Only eSewa is supported.' });
    }

  } catch (error) {
    console.error("Error creating order and initiating payment:", error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

const paymentStatus = async (req, res) => {
  let { orderId, status, payment_gateway } = req.body;
  console.log(req.body)
  
  try {
    // Clean orderId if it contains extra parameters (from URL)
    if (orderId && typeof orderId === 'string' && orderId.includes("?")) {
      orderId = orderId.split("?")[0];
    }
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Handle direct failure status
    if (status === "FAILED") {
      order.paymentStatus = "FAILED";
      await order.save();

      return res.status(200).json({
        message: "Payment status updated to FAILED",
        status: "FAILED",
      });
    }

    // Verify payment with eSewa
    if (payment_gateway === "esewa") {
      const paymentData = {
        product_code: process.env.ESEWA_MERCHANT_ID,
        total_amount: order.totalAmount.toString(),
        transaction_uuid: orderId,
      };

      const response = await axios.get(
        process.env.ESEWA_PAYMENT_STATUS_CHECK_URL,
        {
          params: paymentData,
        }
      );

      const paymentStatusCheck = response.data;

      if (paymentStatusCheck.status === "COMPLETE") {
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentStatus = "paid";
        order.paymentResult = {
          id: paymentStatusCheck.transaction_code || orderId,
          status: paymentStatusCheck.status,
          update_time: new Date(),
        };
        await order.save();

        return res.status(200).json({
          message: "Payment completed successfully",
          status: "COMPLETED",
          order,
        });
      } else {
        order.paymentStatus = "FAILED";
        await order.save();

        return res.status(200).json({
          message: "Payment failed",
          status: "FAILED",
        });
      }
    }

    return res.status(400).json({ message: "Invalid payment gateway. Only eSewa is supported." });
  } catch (error) {
    console.error("Error during payment status check:", error);
    res.status(500).send({
      message: "Payment status check failed",
      error: error.response?.data || error.message,
    });
  }
};

export { createOrderAndInitiatePayment, paymentStatus };