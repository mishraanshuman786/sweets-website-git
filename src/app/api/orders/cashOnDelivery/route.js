// pages/api/orders.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { userId, amount, address } = await request.json();
    await sendOrderConfirmationEmail(address.email, address.orderId);
    await sendDeliveryBoyEmail(
      address.orderId,
      userId,
      amount,
      address.address
    );
    return NextResponse.json({
      status: true,
      userId: userId,
      paymentAmount: amount,
      paymentAddress: address,
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
      user: "mishraanshuman619@gmail.com",
      pass: "jyhb wxoz oprc uozj",
    },
  });

  const mailOptions = {
    from: "mishraanshuman619@gmail.com",
    to: email, // Assuming you have the customer's email in the order details
    subject: "Order Confirmation",
    text: `Thank you for placing your order!\n\nYour Order ID: ${orderId}\n\nPlease keep this ID for future reference.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error.message);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

function sendDeliveryBoyEmail(orderId, userId, amount, address) {
  const transporter = nodemailer.createTransport({
    // Configure your email service (SMTP settings)
    // Example using Gmail:
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "mishraanshuman619@gmail.com",
      pass: "jyhb wxoz oprc uozj",
    },
  });

  const mailOptions = {
    from: "mishraanshuman619@gmail.com",
    to: "mishraanshuman425@gmail.com",
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
<a href="https://laddoostory.com/Cart" style="color: white; text-decoration: none;">Click here to confirm your order</a>
</button>
        <p>Order Details:</p>
        <ul>
          <li>User ID: ${userId}</li>
          <li>Amount: ${amount}</li>
          <li>Address: ${JSON.stringify(address)}</li>
        </ul>
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
