"use client"
import React, { useState, useEffect } from "react";
import "./Success.css";

function Success() {
  const [presentPaymentAmount, setPresentPaymentAmount] = useState(null);
  const [presentPaymentAddress, setPresentPaymentAddress] = useState();
  const [presentProductDetails, setPresentProductDetails] = useState();

  useEffect(() => {
    getData();
    const orderId=generateOrderId();
    console.log("oreder Id:",orderId);
  }, []);

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
  };

  const generateOrderId = () => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const randomString = generateRandomString(10); // You can adjust the length as needed
    const orderId = `${currentDate}-${randomString}`;
    return orderId;
  };


  async function getData() {
    try {
      let amount = await localStorage.getItem("paymentAmount");
      let address= await localStorage.getItem("paymentAddress");
      let details=await localStorage.getItem("productDetails");
      setPresentPaymentAmount(JSON.parse(amount));
      setPresentPaymentAddress(JSON.parse(address));
      setPresentProductDetails(JSON.parse(details));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  console.log("present Payment Address:",presentPaymentAddress);
  console.log("present ProductDetails:",presentProductDetails);

  return (
    <div className="container">
      {presentPaymentAmount !== null ? (
        <div className="success-message">
          <img src="/fireworks.gif" alt="fireworks" width={300} height={300}/>
         <h1> Your Payment is Successful!</h1>
         <h2>You have purchased the products of Rs{presentPaymentAmount}. </h2>
         <h2>Thank You For Shopping With US.</h2>

        </div>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
}

export default Success;
