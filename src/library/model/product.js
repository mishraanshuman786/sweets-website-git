import mongoose from "mongoose";

// creating products table schema
const productModel = new mongoose.Schema({
  productName: String,
  category: [{id:{ type: mongoose.Schema.Types.ObjectId, ref: 'category' },price:Number,rating:Number}],
  desc: String,
  images: [String],
  additional:[{productRating:Number,productComment:String}],
  categoryId:mongoose.Schema.Types.ObjectId,
  categoryIndex:Number
});

// connection products table with productModel schema
export const Product =
  mongoose.models.products || mongoose.model("products", productModel);
