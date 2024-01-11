// ProductSlider.jsx
"use client";

// ProductSlider.jsx

import React, { useState, useEffect, useRef } from "react";
import "./styles/ProductSliderStyle.css";
import { CartState } from "@/context/Context";
import DialogBox from "./DialogBox";
import { useRouter } from "next/navigation";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { IoStar } from "react-icons/io5";

const ProductSlider = (props) => {
  const router = useRouter();

  const imageContainerRef = useRef(null); // Ref for the image container
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showCartAddedDropdown, setShowCartAddedDropdown] = useState(false);
  const [showRemoveCartDropdown, setShowRemoveCartDropdown] = useState(false);

  const {
    state: { cart },
    dispatch,
  } = CartState();

  console.log("cart:", cart);

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
              let productsPath = `/products/${element._id}`;

              return (
                <div
                  className="imagecontainer"
                  ref={imageContainerRef}
                  style={{ backgroundColor: "white" }}
                  key={element._id}
                >
                  <img src={path} alt={element.productName} />
                  <h4>{element.productName}</h4>
                  <h4>
                    {element.category &&
                    element.category[props.index] &&
                    element.category[props.index].price ? (
                      <span>
                        {element.category[props.index].price}{" "}
                        <strike>{element.category[0].price + 100}</strike>
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
                              setShowRemoveCartDropdown(
                                !showRemoveCartDropdown
                              );
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
                              setShowCartAddedDropdown(!showCartAddedDropdown);
                            }}
                          >
                            Add To Cart
                          </button>
                        )}

                        {showCartAddedDropdown ? (
                          <DialogBox
                            title="Cart"
                            content="Your Product is Added to the Cart."
                            isOpen={showCartAddedDropdown}
                            onClose={() => setShowCartAddedDropdown(false)}
                          ></DialogBox>
                        ) : null}

                        {showRemoveCartDropdown ? (
                          <DialogBox
                            title="Cart"
                            content="Product is Removed from the Cart."
                            isOpen={showRemoveCartDropdown}
                            onClose={() => setShowRemoveCartDropdown(false)}
                          ></DialogBox>
                        ) : null}
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
      <div style={{ height: "100%" }}>
        <div
          onClick={handlePrevious}
          style={{
            position: "absolute",
            left: "-100px",
            top: "50%",
            backgroundColor: "grey",
            fontSize: 40,
            borderRadius: 30,
            width: 60,
            height: 60,
            textAlign: "center",
          }}
        >
          <GrPrevious />
        </div>
        <div
          onClick={handleNext}
          style={{
            position: "absolute",
            right: "-100px",
            top: "50%",
            backgroundColor: "grey",
            fontSize: 40,
            borderRadius: 30,
            width: 60,
            height: 60,
            textAlign: "center",
          }}
        >
          <GrNext />
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
