"use client";
import React, { useState } from "react";
import styles from "./CashOnDelivery.module.css";
import { usePayment } from "@/context/PaymentContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CashOnDelivery = () => {
  let router = useRouter();
  let { paymentAmount, paymentAddress, updatePaymentAddress, productDetails } =
    usePayment();
  const [formData, setFormData] = useState({
    name: paymentAddress.name,
    email: paymentAddress.email,
    phone: paymentAddress.mobileNumber,
    address:
      paymentAddress.locality +
      ", " +
      paymentAddress.landmark +
      ", " +
      paymentAddress.city +
      ". " +
      paymentAddress.pincode,
    orderId: "",
  });

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
    setFormData({ ...formData, orderId });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Handle form submission, e.g., initiate cash on delivery payment
    try {
      updatePaymentAddress(formData);

      // Assuming you have the order ID stored in localStorage under the key 'orderId'
      const storedOrderId = JSON.parse(localStorage.getItem("loginStatus"));

      if (!storedOrderId.status) {
        alert("User ID not found in localStorage.");
        return;
      }

      // Sending the order ID with the axios post request
      const response = await axios.post("/api/orders/cashOnDelivery", {
        userId: storedOrderId.data.id,
        amount: paymentAmount,
        formdata: formData,
        productDetails: productDetails,
      });

      // Handle the response as needed
      console.log("Axios Response:", response.data);
      router.push("/");

      toast.success(
        formData.email +
          " ,Your Order with OrderId:" +
          formData.orderId +
          " is Added Successfully.",
        { position: "top-right" }
      );
      alert("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error("Error in Generating Order", { position: "top-right" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 style={{ textAlign: "center" }}>Payment Details</h2>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">
            Name:
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="phone">
            Phone:
          </label>
          <input
            className={styles.input}
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="address">
            Address:
          </label>
          <input
            className={styles.input}
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="orderId">
            Order ID:
          </label>
          <input
            className={styles.input}
            type="text"
            id="orderId"
            name="orderId"
            value={formData.orderId}
            readOnly
          />
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={generateOrderId}>
            Generate Order ID
          </button>
          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={formData.orderId === ""}
          >
            Cash On Delivery
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashOnDelivery;
