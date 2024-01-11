import { connectionSrc } from "@/library/db";
import { Cart } from "@/library/model/cart";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Getting the id and cart data from the request
    const { id, cart } = await request.json();

    // Connection with MongoDB
    await mongoose.connect(connectionSrc, {
      useNewUrlParser: true,
    });

    // Find the cart document for the given user ID
    const existingCart = await Cart.findOne({ user: id });

    if (existingCart) {
      // If the cart for the user exists, update it
      const updatedCart = await Cart.findOneAndUpdate(
        { user: id },
        { $set: { cartItems: cart } },
        { new: true } // Return the updated document
      );

      console.log(`Cart updated for user with ID ${updatedCart.user}`);
    } else {
      console.log("Cart not found for the user.");// Add a log or handle as needed
    }

    // Setting the cookies
    const response = NextResponse.json({
      message: "Cart update successfull.",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    console.log("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
