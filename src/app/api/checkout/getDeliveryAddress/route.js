import { connectionSrc } from "@/library/db";
import { NextRequest, NextResponse } from "next/server";
import { DeliveryAddress } from "@/library/model/deliveryaddress";
import mongoose from "mongoose";

// fetching the addresses available of particular user
export async function POST(request) {
    try {
      // Connection with MongoDB
      await mongoose.connect(connectionSrc, {
        useNewUrlParser: true,
      });
  
       let {userId}=await request.json()   
  
      // Find delivery addresses for the specified userId
      const deliveryAddresses = await DeliveryAddress.findOne({ userId });
  
      if (!deliveryAddresses) {
        return NextResponse.json({ status: false, message: "User not found or has no delivery addresses" });
      }
  
     
      return NextResponse.json({ status: true, data: deliveryAddresses.addresses });
  
    } catch (error) {
      console.log("Fetching delivery addresses error:", error.message);
      return NextResponse.json({ status: false });
    }
  }
