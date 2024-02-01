"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./onlinePayment.module.css";
import { usePayment } from "@/context/PaymentContext";
import { v4 as uuidv4 } from "uuid";

const Pay = () => {
  let { paymentAmount, paymentAddress, updatePaymentAddress, productDetails } =
    usePayment();
  const [formData, setFormData] = useState({
    name: paymentAddress.name,
    mobile: paymentAddress.mobileNumber,
    amount: paymentAmount,
    muid: "MUID-" + uuidv4().toString(36).slice(-6),
    address:
      paymentAddress.locality +
      ", " +
      paymentAddress.landmark +
      ", " +
      paymentAddress.city +
      ". " +
      paymentAddress.pincode,
    email: paymentAddress.email,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("paymentAmount", paymentAmount);
    localStorage.setItem("paymentAddress", JSON.stringify(paymentAddress));
    localStorage.setItem("productDetails", JSON.stringify(productDetails));
    console.log("Form submitted:", formData);
    makePayment();
  };

  const makePayment = async () => {
    try {
      const response = await fetch("/api/phonePay/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("server response from custom phonepey:", responseData);
      router.push(responseData.data);
    } catch (error) {
      console.error("Error making payment:", error.message);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Payment Form</h2>
        <label>
          <strong className={styles.label}>Order Id:</strong>
          <input
            style={{ marginLeft: 19 }}
            type="text"
            className={styles.input}
            name="name"
            value={formData.muid}
            onChange={handleChange}
            placeholder="Name"
            disabled
          />
        </label>
        <br />
        <label>
          <strong className={styles.label}>Name:</strong>
          <input
            style={{ marginLeft: 32 }}
            type="text"
            className={styles.input}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            disabled
          />
        </label>
        <br />
        <label>
          <strong className={styles.label}>Mobile:</strong>
          <input
            style={{ marginLeft: 28 }}
            type="number"
            className={styles.input}
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            disabled
          />
        </label>
        <br />
        <label>
          <strong className={styles.label}>E-mail:</strong>
          <input
            style={{ marginLeft: 28 }}
            type="E-mail"
            className={styles.input}
            name="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail Address"
            disabled
          />
        </label>
        <br />
        <label>
          <strong className={styles.label}>Address:</strong>
          <input
            style={{ marginLeft: 16 }}
            type="text"
            className={styles.input}
            name="Address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            disabled
          />
        </label>
        <br />
        <label>
          <strong className={styles.label}>Amount:</strong>
          <input
            style={{ marginLeft: 20 }}
            type="number"
            className={styles.input}
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Payment Amount"
            disabled
          />
        </label>
        <br />
        <button className={styles.button} type="submit">
          <strong>Pay Now</strong>
        </button>
      </form>
    </div>
  );
};

export default Pay;
