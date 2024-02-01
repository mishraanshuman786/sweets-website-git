import { connectionSrc } from "@/library/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Order } from "@/library/model/order";
import mongoose from "mongoose";

export async function POST(request){
      try{
        const { userId,orderId, amount, paymentAddress ,productDetails} = await request.json();

        // saving the order details to the database
        //     Connect to MongoDB
        mongoose.connect(connectionSrc);
          // Save the order details to MongoDB using Mongoose model
        const order = new Order({
          userId: userId,
          orderId: orderId,
          name: paymentAddress.name,
          mobile: paymentAddress.mobile,
          address: paymentAddress.address,
          paymentMode:"pay online",
          amount: amount,
          productDetails:productDetails,
          orderCompleted:true
        });
     
         await order.save();
    
    
        // ==================================================================
        // await sendOrderConfirmationEmail( paymentAddress.orderId, userId, amount,paymentAddress.address,
        //   productDetails,paymentAddress.email);
        // await sendDeliveryBoyEmail(
        //   paymentAddress.orderId,
        //   userId,
        //   amount,
        //   paymentAddress.address,
        //   productDetails
        // );
        return NextResponse.json({
          status: true,
          userId:await userId,
          orderId:await orderId,
          paymentAmount:await amount,
          paymentAddress:await paymentAddress,
          productDetails:await productDetails
        });
      }catch(error){
        console.error(error);
        return NextResponse.json({ status: false, error: error.message });
      }
}