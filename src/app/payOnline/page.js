"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="container mt-5">
      <form className="text-white p-4 rounded" style={{backgroundColor:"violet"}} onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Payment Form</h2>
        <div className="mb-3">
          <label className="form-label">
            <strong>Order Id:</strong>
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.muid}
            onChange={handleChange}
            placeholder="Name"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            <strong>Name:</strong>
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            <strong>Mobile:</strong>
          </label>
          <input
            type="number"
            className="form-control"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            <strong>E-mail:</strong>
          </label>
          <input
            type="email"
            className="form-control"
            name="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail Address"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            <strong>Address:</strong>
          </label>
          <input
            type="text"
            className="form-control"
            name="Address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            <strong>Amount:</strong>
          </label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Payment Amount"
            disabled
          />
        </div>
        <button className="btn btn-light" type="submit">
          <strong>Pay Now</strong>
        </button>
      </form>
    </div>
  );
};

export default Pay;
