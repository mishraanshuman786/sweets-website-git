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
        await sendOrderConfirmationEmail( orderId, userId, amount,paymentAddress.address,
          productDetails,paymentAddress.email);
        await sendDeliveryBoyEmail(
          orderId,
          userId,
          amount,
          paymentAddress.address,
          productDetails
        );
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


// order confirmation email to customer

function sendOrderConfirmationEmail(orderId, userId, amount, address,productDetails,email) {
  const transporter = nodemailer.createTransport({
    // Configure your email service (SMTP settings)
    // Example using Gmail:
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "laddoostory@gmail.com",
      pass: "bjoo sxat hbtb auta",
    },
  });

   // Convert productDetails array to a formatted string
   const productDetailsString = productDetails
   .map(
     (product) =>
       `Product Name: ${product.productName}, Price: ${product.price}, Weight: ${product.weight}`
   )
   .join("\n");


  const mailOptions = {
    from: "laddoostory@gmail.com",
    to: email, // Assuming you have the customer's email in the order details
    subject: "Order Confirmation",
    text: `Thank you for placing your order!\n\nYour Order ID: ${orderId}\n\nPlease keep this ID for future reference.`,
    html:`<p>Order Details:</p>
    <ul>
      <li>User ID: ${userId}</li>
      <li>Amount: ${amount}</li>
      <li>Address: ${JSON.stringify(address)}</li>
    </ul>
    <p>Product Details:</p>
    <pre>${productDetailsString}</pre>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error.message);
    } else {
     
    }
  });
}


// order confirmation email to laddoostory


function sendDeliveryBoyEmail(orderId, userId, amount, address,productDetails) {
  const transporter = nodemailer.createTransport({
    // Configure your email service (SMTP settings)
    // Example using Gmail:
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "laddoostory@gmail.com",
      pass: "bjoo sxat hbtb auta",
    },
  });

  // Convert productDetails array to a formatted string
  const productDetailsString = productDetails
    .map(
      (product) =>
        `Product Name: ${product.productName}, Price: ${product.price}, Weight: ${product.weight}`
    )
    .join("\n");


    const mailOptions = {
      from: "laddoostory@gmail.com",
      to: "laddoostory@gmail.com",
      subject: "Order Confirmation",
      html: `
          <p>Thank you for placing your order!</p>
          <p>Your Order ID: ${orderId}</p>
          <p>Please keep this ID for future reference.</p>
          
          <p>Order Details:</p>
          <ul>
            <li>User ID: ${userId}</li>
            <li>Amount: ${amount}</li>
            <li>Address: ${JSON.stringify(address)}</li>
          </ul>
          <p>Product Details:</p>
          <pre>${productDetailsString}</pre>
        `,
    };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error.message);
    } else {
      
    }
  });
}
