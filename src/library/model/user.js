import mongoose from "mongoose";


// creating products table schema
const userModel=new mongoose.Schema(
   {
   name:{
      type:String,
      required:true,
   },
   email:{
      type:String,
      required:true,
   },
  password:{
   type:String,
   required:true,
  }
},
  {timestamps:true}
);


// connection products table with productModel schema
export const User=mongoose.models.users || mongoose.model("users",userModel);
