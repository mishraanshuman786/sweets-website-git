"use client";
import CustomNavbar from "../components/CustomNavbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import "../products/products.css";
import { motion } from "framer-motion";
import { FaRegStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import Link from "next/link";
import { CartState } from "@/context/Context";

export default function Product() {

  const {
    state: { cart },
    dispatch,
  } = CartState();

  useEffect(() => {
    getData();
  }, []);

  const [navProducts, setNavProducts] = useState();

  async function getData() {
    let data = await fetch("api/products");
    data = await data.json();
    await setNavProducts(data);
  }

  return (
    <div style={{ marginTop: 225 }}>
      {/* Navbar */}
      <CustomNavbar />

      <div
        className="products md:container mt-4 mb-4 ms-lg-4 ms-sm-5 ms-4"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* start */}
        {navProducts ? (
          navProducts.result.map((element, index) => {
            let path;
            path = `/ProductImages/${element.images[0]}.jpg`;
            let productPageUrl = `/products/${element._id}`;

            return (
             
                <motion.div
                  key={element._id}
                  whileHover={{ scale: 1.1 }}
                  className="card"
                  style={{ backgroundColor: "whitesmoke", width: "320px" }}
                >
                   <Link
                key={index}
                href={productPageUrl}
                style={{ textDecoration: "none" }}
              >
                  <Image
                    src={path}
                    width={280}
                    style={{
                      border: "1px solid grey",
                      width: 280,
                      margin: "auto",
                    }}
                    height={300}
                    className="card-img-top m-4 mb-1"
                    alt="1"
                  />
                       </Link>
                  <div className="card-body">
                    <h3
                      className="card-title text-dark text-sm"
                      style={{ textAlign: "left" }}
                    >
                      {element.productName}
                    </h3>

                    {element.category &&
                    element.category.length > 0 &&
                    element.category[element.categoryIndex].price ? (
                      <div>
                        <h5>
                          <span
                            style={{
                              textDecoration: "line-through",
                              marginRight: 4,
                              color: "grey",
                            }}
                          >
                            {" "}
                            <span>&#8377;</span>{element.category[element.categoryIndex].price +
                              100}
                          </span>
                          {element.category[element.categoryIndex].price}
                        </h5>
                        <div>
                          {[...Array(5)].map((_, index) => {
                            return element.category[element.categoryIndex]
                              .rating > index ? (
                              <IoStar />
                            ) : (
                              <FaRegStar />
                            );
                          })}
                        </div>

                        {/* button for add to cart */}
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              {cart.some(
                                (p) =>
                                  p._id === element._id &&
                                  p.categoryId === element.categoryId
                              ) ? (
                                <button
                                  style={{
                                    width: 145,
                                    height: 44,
                                    borderRadius: 6,
                                    fontSize: 14,
                                    color: "white",
                                    margin: 15,
                                    border: "none",
                                    backgroundColor: "brown",
                                  }}
                                  onClick={() => {
                                    dispatch({
                                      type: "REMOVE_FROM_CART",
                                      payload: {
                                        productId: element._id,
                                      },
                                    });
                                  }}
                                >
                                  Remove To Cart
                                </button>
                              ) : (
                                <button
                                  style={{
                                    width: 145,
                                    height: 44,
                                    borderRadius: 6,
                                    fontSize: 14,
                                    color: "white",
                                    margin: 15,
                                    border: "none",
                                    backgroundColor: "brown",
                                  }}
                                  onClick={() => {
                                    dispatch({
                                      type: "ADD_TO_CART",
                                      payload: element,
                                    });
                                  }}
                                >
                                  Add To Cart
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* ======================== */}
                      </div>
                    ) : null}
                    <br />
                  </div>
                </motion.div>
            
            );
          })
        ) : (
          <div style={{ margin: "auto", height: 100 }}>
            <div class="spinner-border text-warning m-auto" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* end */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
