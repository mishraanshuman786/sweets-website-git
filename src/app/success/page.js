"use client"
import React, { useState, useEffect } from "react";
import "./Success.css";
import axios from "axios";

function Success() {
  const [presentPaymentAmount, setPresentPaymentAmount] = useState(null);
  const [presentPaymentAddress, setPresentPaymentAddress] = useState();
  const [presentProductDetails, setPresentProductDetails] = useState();
  const [presentOrderId,setPresentOrderId]=useState();
  const [presentUserId,setPresentUserId]=useState();

  useEffect(() => {
    getData();
 
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
      // getting the paymentAmount, paymentAddress, productDetails from the localStorage
      let amount = await localStorage.getItem("paymentAmount");
      let address= await localStorage.getItem("paymentAddress");
      let details=await localStorage.getItem("productDetails");

      // getting the userId
       // Assuming you have the user ID stored in localStorage under the key 'loginStatus'
       const storedUserId = JSON.parse(localStorage.getItem("loginStatus"));

      // setting the data in the states
      setPresentPaymentAmount(JSON.parse(amount));
      setPresentPaymentAddress(JSON.parse(address));
      setPresentProductDetails(JSON.parse(details));
      setPresentOrderId(generateOrderId);
      setPresentUserId(storedUserId.data.id);

      // Delay the API call by 2000 milliseconds (2 seconds)
    setTimeout(async () => {
      // saving the data to the order database
      // Sending the order ID with the axios post request
      const response = await axios.post("/api/orders/payOnline", {
        userId: presentUserId,
        orderId: presentOrderId,
        amount: presentPaymentAmount,
        paymentAddress: presentPaymentAddress,
        productDetails: presentProductDetails,
      });

      // Handle the response as needed
      console.log("Axios Response Success Page:", response.data);
    }, 2000); // Adjust the delay time as needed



    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  console.log("present Payment Address:",presentPaymentAddress);
  console.log("present ProductDetails:",presentProductDetails);
  console.log("present Payment Amount:",presentPaymentAmount);
  console.log("present User Id:",presentUserId);
  console.log("present order id:",presentOrderId);

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
