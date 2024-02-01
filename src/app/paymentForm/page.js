"use client";
import React, { useEffect, useState } from "react";
import styles from "./PaymentForm.module.css";
import CustomNavbar from "../components/CustomNavbar";
import axios from "axios";
import { usePayment } from "@/context/PaymentContext";
import { useRouter } from "next/navigation";

const PaymentForm = () => {
  // states for total discount and total amount
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [withoutDiscountAmount, setWithoutDiscountAmount] = useState(0);


  let router = useRouter();
  let routerbutton = useRouter();
  let { paymentAmount, paymentAddress, updatePaymentAddress, productDetails } =
    usePayment();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  const handleRadioChange = (index) => {
    setSelectedAddressIndex(index);
  };

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    mobileNumber: "",
    pincode: "",
    locality: "",
    email: "",
    address: "",
    city: "",
    landmark: "",
    alternatePhone: "",
  });

  useEffect(() => {
    // Fetch totalDiscount and withoutDiscountAmount from local storage
    const storedTotalDiscount = localStorage.getItem("totalDiscount");
    const storedWithoutDiscountAmount = localStorage.getItem("withoutDiscountAmount");

    // Update state variables if values are available in local storage
    if (storedTotalDiscount) {
      setTotalDiscount(parseFloat(JSON.parse(storedTotalDiscount)));
    }

    if (storedWithoutDiscountAmount) {
      setWithoutDiscountAmount(parseFloat(storedWithoutDiscountAmount));
    }
  }, []);

  useEffect(() => {
    fetchData();
    if (paymentAmount === 0) {
      router.replace("/");
    }
  }, []);

  // Display a warning message when the page is reloaded
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message =
        "Are you sure you want to leave? Your changes may not be saved.";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // saving addresses to the database
  const saveData = async () => {
    try {
      if (
        newAddress.name != "" &&
        newAddress.email != "" &&
        newAddress.address != "" &&
        newAddress.city !== "" &&
        newAddress.mobileNumber !== "" &&
        newAddress.landmark !== ""
      ) {
        const item = localStorage.getItem("loginStatus");
        const loginInfo = JSON.parse(item);
        if (loginInfo.status) {
          const response = await axios.post("/api/checkout/deliveryAddress", {
            userId: loginInfo.data.id,
            address: newAddress,
          });

          // fetching addresses from the database
          fetchData();
          console.log("saving response", response);
        }
      } else {
        alert("Please fill all the fileds.....");
      }
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };

  //  fetching addresses from the database
  const fetchData = async () => {
    try {
      const item = localStorage.getItem("loginStatus");
      const loginInfo = JSON.parse(item);
      if (loginInfo.status) {
        const response = await axios.post("/api/checkout/getDeliveryAddress", {
          userId: loginInfo.data.id,
        });

        setAddresses(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      newAddress.name != "" &&
      newAddress.email != "" &&
      newAddress.address != "" &&
      newAddress.city !== "" &&
      newAddress.landmark !== ""
    ) {
      // Update addresses state if it's an array
      if (Array.isArray(addresses)) {
        await setAddresses([...addresses, newAddress]);
      } else {
        console.error("Addresses is not an array:", addresses);
      }

      // Optionally, you can clear the form fields
      setNewAddress({
        name: "",
        mobileNumber: "",
        pincode: "",
        locality: "",
        email: "",
        address: "",
        city: "",
        landmark: "",
        alternatePhone: "",
      });
    }
  };

  return (
    <div className="head" style={{ marginTop: 170 }}>
      <CustomNavbar />
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.leftHeading}>
            <h2 style={{ fontSize: 24, padding: 6 }}>DELIVERY ADDRESS</h2>
          </div>
          <div className={styles.leftAddressList}>
            {
              // showing saved addresses
              addresses ? (
                addresses.map((element, index) => {
                  return (
                    <div key={index}>
                      <div
                        style={{
                          display: "flex",
                          paddingLeft: 20,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        <div>
                          <input
                            type="radio"
                            value={index + 1}
                            name="radio"
                            id={`address_${index}`}
                            checked={selectedAddressIndex === index}
                            onChange={() => handleRadioChange(index)}
                          />
                        </div>
                        <div style={{ marginLeft: 16, marginRight: 16 }}>
                          {element.name}
                        </div>
                        <div>{element.mobileNumber}</div>
                      </div>
                      <div
                        style={{
                          marginBottom: 15,
                          width: 500,
                          marginLeft: 40,
                          padding: 20,
                        }}
                      >
                        {element.address}
                      </div>
                      <hr />
                    </div>
                  );
                })
              ) : (
                <div>Please add a address.</div>
              )
            }
          </div>

          <div className={styles.formContainer}>
            {/* heading */}
            <div className={styles.leftHeading}>
              <h2 style={{ fontSize: 24, padding: 6 }}>
                Enter New Delivery Address
              </h2>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.spanStyle}>
                <span style={{ marginRight: 40 }}>
                  <input
                    type="text"
                    placeholder="Name"
                    className={styles.input}
                    value={newAddress.name}
                    required
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, name: e.target.value })
                    }
                  />
                </span>
                <span>
                  <input
                    type="text"
                    placeholder="10 Digit Mobile Number"
                    className={styles.input}
                    value={newAddress.mobileNumber}
                    required
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        mobileNumber: e.target.value,
                      })
                    }
                  />
                </span>
              </div>
              <div className={styles.spanStyle}>
                <span style={{ marginRight: 40 }}>
                  <input
                    type="text"
                    placeholder="Pincode"
                    className={styles.input}
                    value={newAddress.pincode}
                    required
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, pincode: e.target.value })
                    }
                  />
                </span>
                <span>
                  <input
                    type="text"
                    placeholder="Locality"
                    className={styles.input}
                    value={newAddress.locality}
                    required
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, locality: e.target.value })
                    }
                  />
                </span>
              </div>
              <div className={styles.spanStyle}>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.email}
                  value={newAddress.email}
                  required
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, email: e.target.value })
                  }
                />
              </div>
              <div className={styles.spanStyle}>
                <textarea
                  style={{
                    paddingLeft: 8,
                    width: 540,
                    borderRadius: 4,
                    width: "90%",
                  }}
                  placeholder="Address(Area and Street)"
                  rows={4}
                  required
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                ></textarea>
              </div>
              <div className={styles.spanStyle}>
                <span style={{ marginRight: 40 }}>
                  <input
                    type="text"
                    placeholder="City/District/Town"
                    className={styles.input}
                    value={newAddress.city}
                    required
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                </span>
              </div>
              <div className={styles.spanStyle}>
                <span style={{ marginRight: 40 }}>
                  <input
                    type="text"
                    placeholder="Landmark"
                    className={styles.input}
                    required
                    value={newAddress.landmark}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, landmark: e.target.value })
                    }
                  />
                </span>
                <span>
                  <input
                    type="text"
                    placeholder="Alternate Phone"
                    className={styles.input}
                    value={newAddress.alternatePhone}
                    required
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        alternatePhone: e.target.value,
                      })
                    }
                  />
                </span>
              </div>

              {/* submit button */}
              <div className={styles.spanStyle}>
                <button
                  type="submit"
                  onClick={saveData}
                  className={styles.button}
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
        <div className={styles.rightContainer}>
          <div className={styles.leftHeading}>
            <h2 style={{ fontSize: 24, padding: 6 }}>PRICE DETAILS</h2>
          </div>
          <div
            style={{
              padding: 15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label style={{ fontSize: 25 }}>Price:</label>
            <span style={{ fontSize: 25 }}>&#8377;{withoutDiscountAmount}</span>
          </div>
          <div
            style={{
              padding: 15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label style={{ fontSize: 25 }}>Delivery Charges:</label>
            <span style={{ fontSize: 25 }}>&#8377;0</span>
          </div>
          <div
            style={{
              padding: 15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label style={{ fontSize: 25 }}>Discount:</label>
            <span style={{ fontSize: 25 }}>&#8377;{totalDiscount}</span>
          </div>
          <div style={{ borderTop: "2px dashed grey" }}></div>
          <div
            style={{
              padding: 15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label style={{ fontSize: 25, fontWeight: "bold" }}>
              Total Payable:
            </label>
            <span style={{ fontSize: 25 }}>&#8377;{paymentAmount}</span>
          </div>
          <hr />
          <div className={styles.ButtonContainer}>
          <button
            className={styles.button}
            onClick={() => {
              if (selectedAddressIndex !== null) {
                updatePaymentAddress(addresses[selectedAddressIndex]);
                routerbutton.replace("/payments/cashOnDelivery");
              } else {
                alert("Please select an address");
              }
            }}
          >
            Cash On Delivery
          </button>
          <button
            className={styles.button}
            onClick={() => {
              if (selectedAddressIndex !== null) {
                updatePaymentAddress(addresses[selectedAddressIndex]);
                routerbutton.replace("/payOnline");
              } else {
                alert("Please select an address");
              }
            }}
          >
            Pay Online
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
