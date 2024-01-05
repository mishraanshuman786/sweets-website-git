// ProductSlider.jsx
"use client"

// ProductSlider.jsx

import React, { useState, useEffect, useRef } from "react";
import "./styles/ProductSliderStyle.css";
import { CartState } from "@/context/Context";
import DialogBox from "./DialogBox";
import { useRouter } from "next/navigation";

const ProductSlider = () => {
  const router = useRouter();
  const imageContainerRef = useRef(null); // Ref for the image container
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    getProducts();
  }, []);

  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [navProducts, setNavProducts] = useState();
  const [showCartAddedDropdown, setShowCartAddedDropdown] = useState(false);
  const [showRemoveCartDropdown, setShowRemoveCartDropdown] = useState(false);

  async function getProducts() {
    let productsdata = await fetch("api/products");
    productsdata = await productsdata.json();
    await setNavProducts(productsdata);
  }

  const handleNext = () => {
    const container = imageContainerRef.current;
    if (container) {
      const containerWidth = container.offsetWidth;
      const numItems = navProducts.result.length;
      const maxPosition = Math.max(0, numItems - Math.ceil(containerWidth / 1200));

      const newPosition = Math.min(scrollPosition + 1, maxPosition);
      setScrollPosition(newPosition);
    }
  };

  const handlePrevious = () => {
    setScrollPosition((prevPosition) => Math.max(0, prevPosition - 1));
  };

  return (
    <div className="container">
      <h3 style={{ color: "brown", padding: 10 }}>Grab The Deals</h3>
      <div className="stylecontainer">
        <div
          className="image-container"
          ref={imageContainerRef} 
          style={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${scrollPosition * 6}%)`,
          }}
        >
          {navProducts ? (
            navProducts.result.map((element) => {
              let path = `/ProductImages/${element.images[0]}.jpg`;
              let productsPath = `/products/${element._id}`;
             

              return (
                <div
                  className="imagecontainer"
                  style={{ backgroundColor: "white" }}
                  key={element._id}
                  onClick={() => router.push(productsPath)}
                >
                  <img src={path} alt={element.productName} />
                  <h4>{element.productName}</h4>
                  {/* <h4>{element.category[0].rating}</h4> */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    
                  <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                  {cart.some((p) => p._id === element._id) ? (
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
                            payload: { id: element._id },
                          });
                          setShowRemoveCartDropdown(!showRemoveCartDropdown);
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
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ProductSlider;
