// Pay.js

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./onlinePayment.module.css";

const Pay = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    amount: "",
    muid: "",
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
    // You can perform any additional logic here with the submitted data
    console.log("Form submitted:", formData);
    makePayment();
  };

  const makePayment = async () => {
    try {
      const response = await fetch("/api/phonePey/", {
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
          <strong className={styles.label}>Name:</strong>
          <input
            style={{marginLeft:32}}
            type="text"
            className={styles.input}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </label>
        <br />
        <label>
          <strong className={styles.label}>Mobile:</strong>
          <input
           style={{marginLeft:28}}
            type="number"
            className={styles.input}
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
          />
        </label>
        <br />
        <label>
          <strong  className={styles.label}>E-mail:</strong>
          <input
            style={{marginLeft:28}}
            type="E-mail"
            className={styles.input}
            name="Email"
            value={formData.mail}
            onChange={handleChange}
            placeholder="E-mail Address"
          />
        </label>
        <br />
        <label>
          <strong className={styles.label}>Address:</strong>
          <input
            style={{marginLeft:16}}
            type="text"
            className={styles.input}
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            placeholder="Address"
          />
        </label>
        <br />
        <label>
          <strong className={styles.label}>Amount:</strong>
          <input
            style={{marginLeft:20}}
            type="number"
            className={styles.input}
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Payment Amount"
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
