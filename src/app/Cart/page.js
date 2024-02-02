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
import CartProductShowing from "../components/CartProductsShowing";


export default function Cart() {
  const [productWeights, setProductWeights] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0); // New state variable
  const [withoutDiscountAmount,setWithoutDiscountAmount]=useState(0);
  let {
    state: { cart, idPrice },
    dispatch,
  } = CartState();

  let { paymentAmount, updatePaymentAmount, addProductDetails } = usePayment();

  useEffect(() => {
    let calculatedWithoutDiscountAmount=0;
    let calculatedTotalAmount = 0;
    let calculatedTotalDiscount = 0; // New variable to track total discount
    let updatedProducts = [];

    if (cart.length >= 1) {
      cart.forEach((item) => {
        const weight = productWeights[item._id] || 1;
         
        calculatedWithoutDiscountAmount +=item.category[item.categoryIndex].price;
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
    setWithoutDiscountAmount(calculatedWithoutDiscountAmount);
  }, [cart, idPrice, productWeights]);

  useEffect(() => {
    localStorage.setItem("totalDiscount", JSON.stringify(totalDiscount.toFixed(2)));
    localStorage.setItem("withoutDiscountAmount", JSON.stringify(withoutDiscountAmount));
  }, [totalDiscount,withoutDiscountAmount]);

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
                replace
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
                <CartProductShowing key={item._id} item={item} productWeight={productWeight} setProductWeights={setProductWeights} dispatch={dispatch} />
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

      {/* whatsapp content */}

      <div
                className="fixed-bottom"
                style={{ marginBottom: 100, marginLeft: 1600, width: 100 }}
              >
                <Link
                  className="show-tool-tip"
                  href="https://wa.me/916307010388"
                  style={{ textDecoration: "none" }}
                  target="_blank"
                >
                  <img
                    src="/whatsapp.svg"
                    alt="whatsapp"
                    className="bounce" // Apply the bounce class here
                    style={{
                      width: 60,
                      height: 60,
                      color: "green",
                      animation: "bounce 1s infinite",
                    }} // Apply the bouncing animation
                  />
                </Link>
              </div>

      <Footer />
    </div>
  );
}
