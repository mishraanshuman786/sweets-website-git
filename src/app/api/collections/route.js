import { connectionSrc } from "@/library/db";
import { Categories } from "@/library/model/categories";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // connection with Mongodb
    await mongoose.connect(connectionSrc);
    let data = await Categories.find();
    return NextResponse.json({ result: data });
  } catch (err) {
    console.error("error:", err.message);
    return NextResponse.json({ result: false });
  }
}