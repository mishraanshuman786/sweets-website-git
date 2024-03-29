import { connectionSrc } from "@/library/db";
import { Product } from "@/library/model/product.js";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // connection with Mongodb
    await mongoose.connect(connectionSrc, {
      useNewUrlParser: true,
      // No need for useUnifiedTopology option
    });
    let data = await Product.find();

    return NextResponse.json({ result: data });
  } catch (err) {
    console.error("error:", err.message);
    return NextResponse.json({ result: false });
  }
}
