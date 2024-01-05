import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req) {
  const razorpay = new Razorpay({
    key_id: 'rzp_test_4n0cJskQlKIB1y',
    key_secret: 'XaWfBv8faIlcWAwHwZkEn12B',
  });

  try {
    // Log request payload
    console.log('Request payload:', req.body);
    
    try {
      let requestBody = await req.text();
      let { amount } = JSON.parse(requestBody);

      if (!amount) {
        const missingAmountError = new Error('The amount field is required.');
        missingAmountError.status = 400;
        throw missingAmountError;
      }

      const options = {
        amount: amount * 100, // amount in paise
        currency: 'INR',
      };

      const order = await razorpay.orders.create(options);

      // Log Razorpay Order
      console.log('Razorpay Order:', order);

      // Check for Razorpay API errors
      if (order.error) {
        const razorpayError = new Error(`Razorpay API Error: ${order.error.description}`);
        razorpayError.status = 500; // or a more specific status code
        throw razorpayError;
      }

      return NextResponse.json({
        id: order.id,
        amount: amount,
        status: 200,
      });

    } catch (error) {
      console.error('Error parsing request payload:', error);

      // Handle parsing error
      const parsingError = new Error('Invalid request payload');
      parsingError.status = 400;
      throw parsingError;
    }
  } catch (error) {
    console.error('API Error:', error);

    // Log the entire error object
    console.error(error);

    // Handle other errors and provide a generic message
    const genericError = new Error('Internal Server Error');
    genericError.status = error.status || 500;
    throw genericError;
  }
}