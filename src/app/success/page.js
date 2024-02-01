"use client"
import React, { useState, useEffect } from "react";
import "./Success.css";
import axios from "axios";
import { useRouter } from "next/navigation";

function Success() {
  const backButtonRouter = useRouter();
  const [presentPaymentAmount, setPresentPaymentAmount] = useState(null);
  const [presentPaymentAddress, setPresentPaymentAddress] = useState();
  const [presentProductDetails, setPresentProductDetails] = useState();
  const [presentOrderId, setPresentOrderId] = useState();
  const [presentUserId, setPresentUserId] = useState();

  useEffect(() => {
    // Add event listener for the popstate event
    const handlePopstate = (event) => {
      event.preventDefault();
      // Run your replace method when the browser back button is clicked
      backButtonRouter.replace("/Cart");
    };

    window.addEventListener("popstate", handlePopstate);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [backButtonRouter]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          presentOrderId &&
          presentUserId &&
          presentPaymentAddress &&
          presentPaymentAmount &&
          presentProductDetails
        ) {
          const response = await axios.post("/api/orders/payOnline", {
            userId: presentUserId,
            orderId: presentOrderId,
            amount: presentPaymentAmount,
            paymentAddress: presentPaymentAddress,
            productDetails: presentProductDetails,
          });

          console.log("Axios Response Success Page:", response.data);
        } else {
          console.log("api not called");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    presentPaymentAmount,
    presentPaymentAddress,
    presentProductDetails,
    presentOrderId,
    presentUserId,
  ]);

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
  };

  const generateOrderId = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const randomString = generateRandomString(10);
    const orderId = `${currentDate}-${randomString}`;
    return orderId;
  };

  async function getData() {
    try {
      let amount = await localStorage.getItem("paymentAmount");
      let address = await localStorage.getItem("paymentAddress");
      let details = await localStorage.getItem("productDetails");

      const storedUserId = JSON.parse(localStorage.getItem("loginStatus"));

      setPresentPaymentAmount(JSON.parse(amount));
      setPresentPaymentAddress(JSON.parse(address));
      setPresentProductDetails(JSON.parse(details));
      setPresentOrderId(generateOrderId);
      setPresentUserId(storedUserId.data.id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  console.log("present Payment Address:", presentPaymentAddress);
  console.log("present ProductDetails:", presentProductDetails);
  console.log("present Payment Amount:", presentPaymentAmount);
  console.log("present User Id:", presentUserId);
  console.log("present order id:", presentOrderId);

  return (
    <div className="container">
      {presentPaymentAmount !== null ? (
        <div className="success-message">
          <img src="/fireworks.gif" alt="fireworks" width={300} height={300} />
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
