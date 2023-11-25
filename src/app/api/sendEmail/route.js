// pages/api/sendEmail.js

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req, res) {
  if (req.method === 'POST') {
      
    let payload=await req.json();
    
    const { to,subject,text,  } = payload;

    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false, // Use SSL
      auth: {
        user: 'mishraanshuman619@gmail.com',
        pass: 'jyhb wxoz oprc uozj',
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'mishraanshuman619@gmail.com',
      to,
      subject,
      text,
    };

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return NextResponse.json({ message: 'Email Sent',success:true });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error',success:false });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed',success:false });
  }
}