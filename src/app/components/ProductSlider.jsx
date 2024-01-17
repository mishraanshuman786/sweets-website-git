"use client";

import React, { useState, useEffect, useRef } from "react";
import "./styles/ProductSliderStyle.css";
import { CartState } from "@/context/Context";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { IoStar } from "react-icons/io5";
import Link from "next/link";

const ProductSlider = (props) => {
  const imageContainerRef = useRef(null); // Ref for the image container
  const [scrollPosition, setScrollPosition] = useState(0);

  const {
    state: { cart },
    dispatch,
  } = CartState();

  const handleNext = () => {
    const container = imageContainerRef.current;
    if (container) {
      const containerWidth = 85;
      const numItems = props.data.result.length;
      const maxPosition = Math.max(
        0,
        numItems - Math.ceil(containerWidth / 1200)
      );

      const newPosition = Math.min(scrollPosition + 1, maxPosition);
      setScrollPosition(newPosition);
    }
  };

  const handlePrevious = () => {
    setScrollPosition((prevPosition) => Math.max(0, prevPosition - 1));
  };

  console.log("content:", props.data);

  return (
    <div style={{ position: "relative", width: "85%", margin: "auto" }}>
      <h3 style={{ color: "brown", padding: 10 }}>{props.title}</h3>
      <div className="stylecontainer">
        <div
          className="image-container"
          style={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${scrollPosition * 6}%)`,
          }}
        >
          {props.data && props.data.result ? (
            props.data.result.map((element) => {
              let path = `/ProductImages/${element.images[props.index]}.jpg`;
              let productPageUrl = `/products/${element._id}`;

              return (
                <div
                  className="imagecontainer"
                  ref={imageContainerRef}
                  style={{ backgroundColor: "white" }}
                  key={element._id}
                >
                  <Link href={productPageUrl}>
                    <img
                      style={{ marginTop: 10 }}
                      src={path}
                      alt={element.productName}
                    />
                  </Link>
                  <h4>{element.productName}</h4>
                  <h4>
                    {element.category &&
                    element.category[element.categoryIndex] &&
                    element.category[element.categoryIndex].price ? (
                      <span>
                        {element.category[element.categoryIndex].price}{" "}
                        <strike>{element.category[element.categoryIndex].price + 100}</strike>
                      </span>
                    ) : (
                      "Price not available"
                    )}
                  </h4>

                  <div className="rating">
                    {element.category &&
                    element.category[props.index] &&
                    element.category[props.index].rating
                      ? Array.from(
                          { length: element.category[props.index].rating },
                          (_, i) => (
                            <span key={i} className="star">
                              <IoStar />
                            </span>
                          )
                        )
                      : "Rating not available"}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
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
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next and Previous buttons */}
      <div className="product-slider-button">
        <div className="previous-button" onClick={handlePrevious}>
          <GrPrevious />
        </div>
        <div className="next-button" onClick={handleNext}>
          <GrNext />
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
