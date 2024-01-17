"use client";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";
import { IoStar } from "react-icons/io5";
import { CartState } from "@/context/Context";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import ProductReview from "@/app/components/ProductReview";
export default function Product({ params }) {
  // state to store particular product data
  const [product, setProduct] = useState();
  let path;

  useEffect(() => {
    getProduct();
  });

  const {
    state: { cart },
    dispatch,
  } = CartState();

  async function getProduct() {
    let url = `/api/products/${params.product}`;
    let data = await fetch(url);
    data = await data.json();
    await setProduct(data);
  }

  return (
    <div style={{ marginTop: 170 }}>
      {/* // Navbar */}
      <Navbar />
      <div className="container-fluid">
        <div
          className="container m-5 mx-auto"
          style={{
            backgroundColor: "whitesmoke",
            border: "2px solid black",
            borderRadius: 10,
          }}
        >
          {product ? (
            product.result.map((element) => {
              path = `/ProductImages/${element.images[0]}.jpg`;

              return (
                <div className="container-fluid row" key={element._id}>
                  {/* // image figcaption */}
                  <figure className="figure col-12 col-md-3">
                    <Image
                      src={path}
                      width={700}
                      height={360}
                      className="mt-4 figure-img img-fluid rounded"
                      alt="Hello"
                    />
                    <figcaption className="figure-caption">
                      <h5 className="text-dark text-center">
                        {element.productName}
                      </h5>

                      <h4>
                        {element.category &&
                        element.category[element.categoryIndex] &&
                        element.category[element.categoryIndex].price ? (
                          <span>
                            <span>&#8377;</span>{element.category[element.categoryIndex].price}{" "}
                            <strike>{element.category[element.categoryIndex].price + 100}</strike>
                          </span>
                        ) : (
                          "Price not available"
                        )}
                      </h4>

                      <div className="rating">
                    {element.category &&
                    element.category[element.categoryIndex] &&
                    element.category[element.categoryIndex].rating
                      ? Array.from(
                          { length: element.category[element.categoryIndex].rating },
                          (_, i) => (
                            <span key={i} className="star">
                              <IoStar />
                            </span>
                          )
                        )
                      : "Rating not available"}
                  </div>

                      {/* cart button */}
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
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
                    </figcaption>
                  </figure>

                  {/* Content Container */}
                  <div
                    className="col-12 col-md-8 mt-4"
                    style={{
                      border: "1px solid grey",
                      borderRadius: 10,
                      backgroundColor: "wheat",
                      height: "auto",
                    }}
                  >
                    <h4 className="mt-5">{element.productName}</h4>

                    <div
                      className="h5 mt-3 text-left container-fluid"
                      dangerouslySetInnerHTML={{ __html: element.desc }}
                    ></div>
                  </div>
                  <ProductReview productId={element._id} products={product} />
                </div>
              );
            })
          ) : (
            <div
              class="spinner-border text-secondary"
              style={{ margin: "auto" }}
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* Footer Part */}
      <Footer />
    </div>
  );
}
