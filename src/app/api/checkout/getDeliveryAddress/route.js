import { connectionSrc } from "@/library/db";
import { NextResponse } from "next/server";
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

      return NextResponse.json({ status: false });
    }     
  }
