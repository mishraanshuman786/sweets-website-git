import React, { useState, useEffect } from 'react';

const RazorpayForm = ({ amount }) => {
  const [loading, setLoading] = useState(false);

  const openPayModal = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount, // Set the desired amount
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate payment');
      }

      const data = await response.json();

      // Use Razorpay Checkout SDK to open the payment form
      const options = {
        key: 'rzp_test_4n0cJskQlKIB1y',
        amount: data.amount,
        currency: 'INR',
        name: 'Ladoo Story',
        description: 'Payment for your order',
        image: 'path/to/your/logo.png',
        order_id: data.id,
        handler:async function (response) {
          console.log('Payment success:', response);

          // Extract additional details
          const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            ...otherDetails
          } = response;

          // Log the transaction ID and other details
          console.log('Transaction ID:', razorpay_payment_id);
          console.log('Order ID:', razorpay_order_id);
          console.log('Signature:', razorpay_signature);
          console.log('Other Details:', otherDetails);

          if (razorpay_payment_id) {
            alert('Your Payment is Successful. Thank You..');
          }

          // Handle the payment success here
          // saving the payment details in the Database

         let databaseResponse=await fetch("api/payments",{
           method:"POST",
           headers:{
            "Content-Type": "application/json"
           },
           body:JSON.stringify({
                order_id:razorpay_order_id,
                payment_id:razorpay_payment_id,
                signature:razorpay_signature,
                amount,
             })
         });
         

        },
        prefill: {
          name: 'Anshuman Mishra',
          email: 'mishraanshuman619@gmail.com',
          contact: '7706087842',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open(); // Open the popup
    } catch (error) {
      console.error('Error initiating payment:', error.message);
      alert('Error initiating payment: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load Razorpay script dynamically here if needed
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      console.log('Razorpay script loaded');
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <button onClick={openPayModal} type='button' className='btn btn-success w-100 mb-4' disabled={loading}>
        {loading ? 'Processing...' : 'Pay with Razorpay'}
      </button>
    </div>
  );
};

export default RazorpayForm;