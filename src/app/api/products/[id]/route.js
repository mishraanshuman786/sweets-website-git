import { connectionSrc } from "@/library/db";
import { Product } from "@/library/model/product.js";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request,content) {
  try {
    // connection with Mongodb
    mongoose.connect(connectionSrc);
    let data = await Product.findOne({_id:content.params.id});
    console.log(data);
    
    return NextResponse.json({ result:[data], status:true });
   
  } catch (err) {
    console.error("error:", err.message);
    return NextResponse.json({ status:false });
  }
}


