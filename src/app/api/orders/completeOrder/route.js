import { connectionSrc } from "@/library/db";
import { NextResponse } from "next/server";
import { Order } from "@/library/model/order";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' });
    }

    mongoose.connect(connectionSrc);
    const order = await Order.findOne({ orderId });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    // Update the orderCompleted value to true
    order.orderCompleted = true;
    await order.save();

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error searching for order:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
