"use client";
import React, { useEffect, useState } from "react";
import styles from "./PaymentForm.module.css";
import Navbar from "../components/Navbar";
import axios from 'axios';

const PaymentForm = () => {
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
    fetchData();
  }, []);

   // saving addresses to the database
   const saveData = async () => {
    try {
      const item = localStorage.getItem("loginStatus");
      const loginInfo = JSON.parse(item);
      if (loginInfo.status) {
        const response = await axios.post('/api/checkout/deliveryAddress', {
          userId: loginInfo.data.id,
          address: newAddress
        });

        // fetching addresses from the database
        fetchData();
        console.log("saving response", response);
      }
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  //  fetching addresses from the database
  const fetchData = async () => {
    try {
      const item = localStorage.getItem("loginStatus");
      const loginInfo = JSON.parse(item);
      if (loginInfo.status) {
        const response = await axios.post('/api/checkout/getDeliveryAddress', {
          userId: loginInfo.data.id,
        });

        setAddresses(response.data.data);

      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

 
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Update addresses state if it's an array
    if (Array.isArray(addresses)) {
      await setAddresses([...addresses, newAddress]);
    } else {
      console.error('Addresses is not an array:', addresses);
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
  };

  console.log("address:", newAddress);
  console.log("addresses:", addresses);
  return (
    <div style={{ marginTop: 170, backgroundColor: "whitesmoke" }}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.leftHeading}>
            <h2 style={{ fontSize: 24, padding: 6 }}>DELIVERY ADDRESS</h2>
          </div>
          <div className={styles.leftAddressList}>
            {
              // showing saved addresses
              (addresses) ? (
                addresses.map((element,index) => {
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
                          <input type="radio" />
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
              <div style={{ marginLeft: 100 }}>
                <span style={{ marginRight: 40 }}>
                  <input
                    type="text"
                    placeholder="Name"
                    className={styles.input}
                    value={newAddress.name}
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
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        mobileNumber: e.target.value,
                      })
                    }
                  />
                </span>
              </div>
              <div style={{ marginLeft: 100 }}>
                <span style={{ marginRight: 40 }}>
                  <input
                    type="text"
                    placeholder="Pincode"
                    className={styles.input}
                    value={newAddress.pincode}
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
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, locality: e.target.value })
                    }
                  />
                </span>
              </div>
              <div style={{ marginLeft: 100 }}>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.email}
                  value={newAddress.email}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, email: e.target.value })
                  }
                />
              </div>
              <div style={{ marginLeft: 100 }}>
                <textarea
                  style={{ paddingLeft: 8, width: 540, borderRadius: 4 }}
                  placeholder="Address(Area and Street)"
                  rows={4}
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                ></textarea>
              </div>
              <div style={{ marginLeft: 100 }}>
                <span style={{ marginRight: 40 }}>
                  <input
                    type="text"
                    placeholder="City/District/Town"
                    className={styles.input}
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                </span>
              </div>
              <div style={{ marginLeft: 100 }}>
                <span style={{ marginRight: 40 }}>
                  <input
                    type="text"
                    placeholder="Landmark"
                    className={styles.input}
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
              <div style={{ marginLeft: 100 }}>
                <button type="submit" onClick={saveData} className={styles.button}>
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
            <span style={{ fontSize: 25 }}>12000</span>
          </div>
          <div
            style={{
              padding: 15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label style={{ fontSize: 25 }}>Delivery Charges:</label>
            <span style={{ fontSize: 25 }}>49</span>
          </div>
          <div
            style={{
              padding: 15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label style={{ fontSize: 25 }}>Packaging Charges:</label>
            <span style={{ fontSize: 25 }}>20</span>
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
            <span style={{ fontSize: 25 }}>20</span>
          </div>
          <hr />
          <button className={styles.button}>Cash On Delivery</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
