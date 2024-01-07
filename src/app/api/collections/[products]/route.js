import { connectionSrc } from "@/library/db";
import { Product } from "@/library/model/product";
import { Categories } from "@/library/model/categories";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  try {
    // Connect to MongoDB using mongoose
    await mongoose.connect(connectionSrc, { useNewUrlParser: true, useUnifiedTopology: true });

    // Use correct parameter for querying products
    let productData = await Product.find({ categoryId: content.params.products });

    // Use correct parameter for querying categories
    let categoryData = await Categories.findById(content.params.products);

    // Return response with correct property names
    return NextResponse.json({ results: true, result: productData, category: categoryData });
  } catch (err) {
    console.error("Error:", err.message);
    return NextResponse.json({ results: false });
  }
}