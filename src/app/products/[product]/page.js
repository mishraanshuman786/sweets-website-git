"use client";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";
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
            : <div class="spinner-border text-secondary" style={{margin:"auto"}} role="status">
            <span class="visually-hidden">Loading...</span>
          </div>}
        </div>
      </div>

      {/* ========================================================= */}
      {/* Footer Part */}
      <Footer />
    </div>
  );
}
