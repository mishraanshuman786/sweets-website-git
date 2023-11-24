import { connectionSrc } from "@/library/db";
import { Product } from "@/library/models/Product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    // connection with Mongodb
    mongoose.connect(connectionSrc);
    let data = await Product.find();

    return NextResponse.json({ result:data });
  } catch (err) {
    console.error("error:", err.message);
    return NextResponse.json({ result: false });
  }
}


