import { connectionSrc } from "@/library/db";
import { Cart } from "@/library/model/cart";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    // Connection with MongoDB
    await mongoose.connect(connectionSrc, {
      useNewUrlParser: true,
    });

    const reqBody = await request.json();
    const { id } = reqBody;

    // Find the user's cart
    let cart = await Cart.findOne({ user: id });

    // If the user doesn't have a cart, create a new one
    if (!cart) {
      cart = new Cart({
        user: id,
        cartItems: [],
      });

      await cart.save();
    }

    // Fetch the user's cart data
    const data = await Cart.findOne({ user: id });

    console.log("cart data fetched:", data.cartItems[0]);

    return NextResponse.json({ status: true, data: data });

  } catch (error) {
    console.log("fetching cart error:", error.message);
    return NextResponse.json({ status: false });
  }
}
