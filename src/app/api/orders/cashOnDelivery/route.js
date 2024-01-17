import { connectionSrc } from "@/library/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Order } from "@/library/model/order";
import mongoose from "mongoose";

export async function POST(request) {
  try {
   
    const { userId, amount, formdata ,productDetails} = await request.json();

    //saving the order details to the database
        // Connect to MongoDB
      mongoose.connect(connectionSrc);
      // Save the order details to MongoDB using Mongoose model
    const order = new Order({
      userId: userId,
      orderId: formdata.orderId,
      name: formdata.name,
      mobile: formdata.mobile,
      address: formdata.address,
      amount: amount,
      productDetails:productDetails
    });
 
     await order.save();


    // ==================================================================
    await sendOrderConfirmationEmail(formdata.email, formdata.orderId);
    await sendDeliveryBoyEmail(
      formdata.orderId,
      userId,
      amount,
      formdata.address,
      productDetails
    );
    return NextResponse.json({
      status: true,
      userId: userId,
      paymentAmount: amount,
      paymentAddress: formdata.address,
    });
  } catch (error) {
    console.error("Error placing order:", error.message);
    return NextResponse.json({ status: false, error: error.message });
  }
}

function sendOrderConfirmationEmail(email, orderId) {
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
      console.log("Email sent:", info.response);
    }
  });
}

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
          <button style="background-color: #4CAF50; /* Green */
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 5px;">
  <a href="https://laddoostory.com/orderCompletion" style="color: white; text-decoration: none;">Click here to confirm your order</a>
  </button>
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
      console.log("Email sent:", info.response);
    }
  });
}
