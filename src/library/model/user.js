import mongoose from "mongoose";


// creating products table schema
const userModel=new mongoose.Schema({
   name:String,
   email:String,
   password:String,
});


// connection products table with productModel schema
export const User=mongoose.models.users || mongoose.model("users",userModel);
