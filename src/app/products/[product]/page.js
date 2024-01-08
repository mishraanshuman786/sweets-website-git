"use client";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./product.css";
import Footer from "@/app/components/Footer";
import ProductReview from "@/app/components/ProductReview";
import { IoStar } from "react-icons/io5";

export default function Product({ params }) {
  // state to store particular product data
  const [product, setProduct] = useState();
  let path;

  useEffect(() => {
    getProduct();
  });

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
          {product
            ? product.result.map((element) => {
                path = `/ProductImages/${element.images[0]}.jpg`;

                return (
                  <div className="container-fluid row" key={element._id}>
                    {/* // image figcaption */}
                    <figure className="figure col-3">
                      <Image
                        src={path}
                        width={200}
                        height={200}
                        className="mt-4 img-fluid rounded image-zooming"
                        alt="Hello"
                        style={{
                          border: "2px solid grey",
                          height: 360,
                          width: 700,
                        }}
                      />
                      <figcaption className="figure-caption mt-3">
                        <h5 className="text-dark ">{element.productName}</h5>
                        <h5>
                          <strike style={{ marginRight: 4 }}>
                            {element.category[element.categoryIndex].price +
                              100}
                          </strike>
                          {element.category[element.categoryIndex].price}Rs/kg
                        </h5>

                        <div className="rating">
                          {element.category &&
                          element.category[element.categoryIndex] &&
                          element.category[element.categoryIndex].rating
                            ? Array.from(
                                {
                                  length: element.category[element.categoryIndex].rating,
                                },
                                (_, i) => (
                                  <span key={i} >
                                    <IoStar />
                                  </span>
                                )
                              )
                            : "Rating not available"}
                        </div>
                      </figcaption>
                    </figure>

                    <div
                      className="col-8 m-4"
                      style={{
                        border: "1px solid grey",
                        borderRadius: 10,
                        backgroundColor: "wheat",
                      }}
                    >
                      <h4 className="mt-5">{element.productName}</h4>
                      {/* <p className="h5 mt-3 text-left container-fluid">
                        {element.desc}
                      </p> */}
                      <div
                        className="h5 mt-3 text-left container-fluid"
                        dangerouslySetInnerHTML={{ __html: element.desc }}
                      />
                    </div>

                    <ProductReview productId={element._id} products={product} />
                  </div>
                );
              })
            : null}
        </div>
      </div>

      {/* ========================================================= */}
      {/* Footer Part */}
      <Footer />
    </div>
  );
}
