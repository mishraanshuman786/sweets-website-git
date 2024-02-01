"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import Link from "next/link";
import { CartState } from "@/context/Context";
import { usePayment } from "@/context/PaymentContext";
import CustomNavbar from "@/app/components/CustomNavbar";
import Footer from "@/app/components/Footer";
import "./Cart.css";


export default function Cart() {
  const [productWeights, setProductWeights] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0); // New state variable

  let {
    state: { cart, idPrice },
    dispatch,
  } = CartState();

  let { paymentAmount, updatePaymentAmount, addProductDetails } = usePayment();

  useEffect(() => {
    let calculatedTotalAmount = 0;
    let calculatedTotalDiscount = 0; // New variable to track total discount
    let updatedProducts = [];

    if (cart.length >= 1) {
      cart.forEach((item) => {
        const weight = productWeights[item._id] || 1;
        calculatedTotalAmount += calculateTotalAmount(item, weight);
        calculatedTotalDiscount += calculateDiscount(item, weight); // Accumulate discount

        // Add product details to the updatedProducts array
        updatedProducts.push({
          productName: item.productName,
          price: item.category[item.categoryIndex].price,
          weight: `${weight}kg`,
        });
      });

      // Update the products state with the updatedProducts array
      setProducts(updatedProducts);
    }

    updatePaymentAmount(calculatedTotalAmount);
    setTotalDiscount(calculatedTotalDiscount); // Set the total discount
  }, [cart, idPrice, productWeights]);

  useEffect(() => {
    localStorage.setItem("totalDiscount", JSON.stringify(totalDiscount.toFixed(2)));
  }, [totalDiscount]);

  useEffect(() => {
    const fetchLoginStatus = async () => {
      const item = localStorage.getItem("loginStatus");
      if (item) {
        const loginInfo = JSON.parse(item);
        setLoginStatus(loginInfo.status);
      }
    };

    fetchLoginStatus();
  }, []);

  const calculateTotalAmount = (item, productWeight) => {
    const price = item.category[item.categoryIndex].price;
    return price * productWeight-calculateDiscount(item,productWeight);
  };

  const calculateDiscount = (item, productWeight) => {
    const price = item.category[item.categoryIndex].price;
    const categoryId = item.categoryId;

    // Apply discounts based on categoryId and weight
    switch (categoryId) {
      case "656daabf41ff1afeaba93473":
        return price * productWeight * (1 - (productWeight >= 1 ? 0.9 : 1));
      case "656dab9341ff1afeaba93474":
        return price * productWeight * (1 - (productWeight >= 1 ? 0.85 : 1));
      case "656dabc341ff1afeaba93475":
        return price * productWeight * (1 - (productWeight >= 1 ? 0.9 : 1));
      case "656dabe841ff1afeaba93476":
        return price * productWeight * (1 - (productWeight >= 1 ? 0.9 : 1));
      // Add more cases for other categories if needed

      default:
        // Default case (no discount)
        return 0;
    }
  };

  return (
    <div style={{ marginTop: 200 }}>
      {/* navbar */}
      <CustomNavbar />

      {/* filter content */}
      <div className="row m-3 m-sm-5">
        {/* Filters Component */}
        <div
          className="col-lg-3 mb-4 mt-5 col-12 order-2"
          style={{
            border: "1px solid grey",
            borderRadius: 6,
            backgroundColor: "#1A2421",
            height: 480,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Make Payment Button */}
          {cart.length >= 1 && loginStatus ? (
            <div>
              <h4 className="text-light" style={{ textAlign: "center" }}>
                Total Amount:{(paymentAmount).toFixed(2)}
              </h4>
              <h4 className="text-light" style={{ textAlign: "center" }}>
                Total Discount:{totalDiscount.toFixed(2)}
              </h4>
              <Link
                href="/paymentForm"
                className="btn btn-success w-100 col-lg-3 mb-4 mt-5 col-12"
                onClick={() => {
                  addProductDetails(products);
                }}
              >
                Make Payment
              </Link>
            </div>
          ) : (
            <div>
              <h4 className="text-light" style={{ textAlign: "center" }}>
                Total Amount:&#8377;{paymentAmount}
              </h4>
              <Link
                href="/login"
                className="btn btn-success w-100 col-lg-3 mb-4 mt-5 col-12"
              >
                Make Payment
              </Link>
            </div>
          )}
        </div>

        <div
          className="container col-lg-8 col-12 order-1"
          style={{
            border: "1px solid grey",
            borderRadius: 6,
            backgroundColor: "whitesmoke",
          }}
        >
          {cart.length >= 1 ? (
            cart.map((item) => {
              const productWeight = productWeights[item._id] || 1;

              return (
                <div
                  style={{
                    border: "1px solid grey",
                    backgroundColor: "white",
                    margin: 8,
                    borderRadius: 6,
                    padding: 6,
                  }}
                  key={item._id}
                >
                  <h3 style={{ color: "brown" }}>{item.productName}</h3>
                  <div style={{ display: "flex", overflowX: "auto" }}>
                    {item.images.map((ele, index) => {
                      let url = `/ProductImages/${ele}.jpg`;
                      return (
                        <Image
                          src={url}
                          width={180}
                          height={180}
                          style={{
                            border: "1px solid grey",
                            borderRadius: 6,
                            margin: 6,
                          }}
                          alt="Product Images"
                          key={index}
                        />
                      );
                    })}
                  </div>

                  {item.category[item.categoryIndex] &&
                  item.category[item.categoryIndex].price !== undefined ? (
                    <h4>
                      <span style={{ marginLeft: 20 }}>&#8377;</span>
                      {item.category[item.categoryIndex].price} Rs/kg
                    </h4>
                  ) : null}

                  <div>
                    {[...Array(5)].map((_, index) => {
                      return item.category[item.categoryIndex].rating >
                        index ? (
                        <IoStar className="ms-1" />
                      ) : (
                        <FaRegStar className="ms-1" />
                      );
                    })}
                  </div>

                  <div
                    style={{
                      width: 160,
                      padding: 0,
                      height: 40,
                      border: "1px solid black",
                      fontSize: 25,
                      fontWeight: "bold",
                      borderRadius: 6,
                      userSelect: "none",
                      marginTop: 6,
                    }}
                  >
                    <div
                      style={{
                        height: 38,
                        display: "inline-block",
                        width: 29,
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setProductWeights((prevWeights) => ({
                          ...prevWeights,
                          [item._id]:
                            productWeight > 0.25 ? productWeight - 0.25 : 0.25,
                        }));
                      }}
                    >
                      -
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        width: 98,
                        textAlign: "center",
                      }}
                    >
                      {productWeight}kg
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        height: 38,
                        width: 29,
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setProductWeights((prevWeights) => ({
                          ...prevWeights,
                          [item._id]:
                            productWeight < 50 ? productWeight + 0.25 : 50,
                        }))
                      }
                    >
                      +
                    </div>
                  </div>

                  <h3 className="pt-2">
                    Total Amount:
                    <span>
                      &#8377;
                      <strike>
                        {item.category[item.categoryIndex].price *
                          productWeight}
                      </strike>
                      <span style={{ marginLeft: 10 }}>
                        &#8377;{(calculateTotalAmount(item, productWeight)).toFixed(2)} Rs.
                      </span>
                    </span>
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <button
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      style={{
                        width: 145,
                        height: 44,
                        borderRadius: 6,
                        fontSize: 14,
                        color: "white",
                        margin: 15,
                        marginTop: 8,
                        border: "none",
                        backgroundColor: "brown",
                      }}
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: {
                            productId: item._id,
                          },
                        })
                      }
                    >
                      Remove To Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-cart-container" style={{ marginTop: 15 }}>
              <h2>Your Cart is Empty. Please Add Some Products..... </h2>
              <div>
                <img src="/emptycart.webp" alt="empty cart" />
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
