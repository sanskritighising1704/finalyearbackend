import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a product description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a product price"],
    min: 0,
  },
  category: {
    type: String,
    required: [true, "Please provide a product category"],
    enum: [
      "smartphones",
      "laptops",
      "tablets",
      "accessories",
      "cameras",
      "audio",
      "wearables",
      "gaming",
      "other",
    ],
  },
  brand: {
    type: String,
    required: [true, "Please provide a brand name"],
  },
  stock: {
    type: Number,
    required: [true, "Please provide stock quantity"],
    min: 0,
    default: 0,
  },
  images: [
    {
      type: String,
    },
  ],
  specifications: {
    type: Map,
    of: String,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
