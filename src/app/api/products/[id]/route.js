import { connectionSrc } from "@/library/db";
import { Product } from "@/library/model/product.js";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  try {
      // Connection with MongoDB
      await mongoose.connect(connectionSrc, {
        useNewUrlParser: true,
        // No need for useUnifiedTopology option
      });
    let data = await Product.findOne({ _id: content.params.id });

    return NextResponse.json({ result: [data], status: true });
  } catch (err) {
    console.error("error:", err.message);
    return NextResponse.json({ status: false });
  }
}


export async function POST(request, content) {
  try {
    let data = await request.json();
    mongoose.connect(connectionSrc);
   

    // Adding rating and comments in the particular product
    // Using findOneAndUpdate
    const updatedDocument = await Product.findOneAndUpdate(
      { _id: content.params.id },
      { $push: { additional:data } },
      { new: true } // Set to true to return the updated document
    );

    if (updatedDocument) {
     
      return NextResponse.json({ result: updatedDocument, status: true });
    } else {
     
      return NextResponse.json({ status: false });
    }
  } catch (err) {
    console.error("Error:", err.message);
    return NextResponse.json({ status: false });
  }
}
