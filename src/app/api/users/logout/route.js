import { connectionSrc } from "@/library/db";
import { Cart } from "@/library/model/cart";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request) {
  try {

    // getting the id so that we can store the cart data
    const {id,cart} = await request.json();

    const response = NextResponse.json({
      message: "Logout Successfull.",
      success: true,
    });

    // updating the cart into the database

     // Connection with MongoDB
     await mongoose.connect(connectionSrc, {
      useNewUrlParser: true,
      
    });
    const result = await Cart.create(
      {
         user: id,
        cartItems: [cart]
     }
    );
    console.log(`Cart updated for user with ID ${result.user}`);

    // setting the cookies
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    console.log("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
