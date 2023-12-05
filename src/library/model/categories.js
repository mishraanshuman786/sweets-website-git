import mongoose from "mongoose";

// creating category table schema
const categoryModel = new mongoose.Schema({
  name:{type:String,required:true},
  number:{type:String,required:true},
});

// connection products table with productModel schema
export const Categories=mongoose.models.categories||mongoose.model("categories",categoryModel);
