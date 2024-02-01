"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./Success.css";
import axios from "axios";

function Success() {
  const router = useRouter();

  const [presentPaymentAmount, setPresentPaymentAmount] = useState(null);
  const [presentPaymentAddress, setPresentPaymentAddress] = useState();
  const [presentProductDetails, setPresentProductDetails] = useState();
  const [presentOrderId, setPresentOrderId] = useState();
  const [presentUserId, setPresentUserId] = useState();
  const [timer, setTimer] = useState(5);

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

          // Redirect to the home page after 5 seconds
          const intervalId = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
          }, 1000);

          setTimeout(() => {
            clearInterval(intervalId);
            router.push("/Cart");
          }, 5000);
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
    router,
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

      // Redirect to the home page after 5 seconds
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      setTimeout(() => {
        clearInterval(intervalId);
        router.push("/");
      }, 5000);
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
          <h1>Your Payment is Successful!</h1>
          <h2>You have purchased the products of Rs{presentPaymentAmount}. </h2>
          <h2>Thank You For Shopping With US.</h2>
          <p>Redirecting to the home page in {timer} seconds...</p>
        </div>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
}

export default Success;
