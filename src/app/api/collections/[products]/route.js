import { connectionSrc } from "@/library/db";
import { Product } from "@/library/model/product";
import { Categories } from "@/library/model/categories";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content) {
  try {
    // connection with Mongodb
    await mongoose.connect(connectionSrc);
    let productdata = await Product.find({ category: { $elemMatch: { id:content.params.products } } });
     let categorydata=await Categories.find({_id:content.params.products})
    return NextResponse.json({ product: productdata, category: categorydata, reult:true});
  } catch (err) {
    console.error("error:", err.message);
    return NextResponse.json({ result: false });
  }
}