import { connectionSrc } from "@/library/db";
import { DeliveryAddress } from "@/library/model/deliveryaddress";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

//   Post method to add or update a delivery address for the perticular user
export async function POST(request) {
  try {
    // Connection with MongoDB
    await mongoose.connect(connectionSrc, {
      useNewUrlParser: true,
    });

    const reqBody = await request.json();
    const { userId, address } = reqBody;

    // Find the user's delivery addresses
    let deliveryAddress = await DeliveryAddress.findOne({ userId: userId });

    // If the user doesn't have delivery addresses, create a new one
    if (!deliveryAddress) {
      deliveryAddress = new DeliveryAddress({
        userId: userId,
        addresses: [address],
      });

      await deliveryAddress.save();
    } else {
      // If the user already has delivery addresses, add the new address
      deliveryAddress.addresses.push(address);
      await deliveryAddress.save();
    }

    // Fetch the updated delivery addresses
    const updatedAddresses = await DeliveryAddress.findOne({ userId: id });

    console.log("Updated addresses:", updatedAddresses.addresses);

    return NextResponse.json({ status: true, data: updatedAddresses.addresses });

  } catch (error) {
    console.log("Adding address error:", error.message);
    return NextResponse.json({ status: false });
  }
}
