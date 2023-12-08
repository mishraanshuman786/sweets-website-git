import mongoose from "mongoose";

// creating products table schema
const productModel = new mongoose.Schema({
  productName: String,
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }],
  desc: String,
  images: [String],
  price:Number,
  rating:Number
});

// connection products table with productModel schema
export const Product =
  mongoose.models.products || mongoose.model("products", productModel);
