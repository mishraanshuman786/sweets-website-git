"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentAddress, setPaymentAddress] = useState();
  const [productDetails, setProductDetails] = useState();

  useEffect(() => {
    // Retrieve payment details from session storage
    const storedPaymentAmount = sessionStorage.getItem("paymentAmount");
    const storedPaymentAddress = sessionStorage.getItem("paymentAddress");
    const storedProductDetails = sessionStorage.getItem("productDetails");

    
      setPaymentAddress(JSON.parse(storedPaymentAddress));
      setProductDetails(JSON.parse(storedProductDetails));
      setPaymentAmount(storedPaymentAmount);
   
  }, [setPaymentAddress,setProductDetails,setPaymentAmount]); // No dependencies here

  // Polling interval to check for changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Check if data is available
      if (paymentAmount && paymentAddress && productDetails) {
        console.log("Payment Amount:", paymentAmount);
        console.log("Payment Address:", paymentAddress);
        console.log("Product Details:", productDetails);
        clearInterval(interval); // Stop polling once data is available
        router.push("/"); // Redirect to the home page
      }
    }, 1000);

    // Clear the interval if the component unmounts
    return () => clearInterval(interval);
  }, [paymentAmount, paymentAddress, productDetails, router]);

  // Update the countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);

    // Clear the interval if the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Your payment has been done successfully.
      </h1>
      <p style={{ marginTop: 20, fontSize: 18 }}>
        <strong>Redirecting to the home page in {countdown} seconds...</strong>
      </p>
    </div>
  );
};

export default Success;
