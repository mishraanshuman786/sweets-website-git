// pages/api/sendEmail.js

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req, res) {
  if (req.method === 'POST') {
      
    let payload=await req.json();
    
    const { from,subject,text,name  } = payload;

    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: "laddoostory@gmail.com",
        pass: "bjoo sxat hbtb auta",
      }
    });

    // Define the email options
    const mailOptions = {
      from:from,
      to:'laddoostory@gmail.com',
      subject:subject,
      text:text,
    };

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
     
      return NextResponse.json({ message: 'Email Sent',success:true });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error',success:false });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed',success:false });
  }
}