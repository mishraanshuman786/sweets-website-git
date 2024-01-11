import { connectionSrc } from "@/library/db";
import { Categories } from "@/library/model/categories";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // connection with Mongodb
      // Connection with MongoDB
      await mongoose.connect(connectionSrc, {
        useNewUrlParser: true,
       
      });
    let data = await Categories.find();
    // getting all the categories
    return NextResponse.json({ result: data });
  } catch (err) {
    console.error("error:", err.message);
    return NextResponse.json({ result: false });
  }
}