"use client";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/app/components/Footer";


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
    <div>
      {/* // Navbar */}
      <Navbar />
      <div className="container-fluid">
        <div className="container-fluid bg-dark">
          <h1 className="h1 text-light p-2">Products</h1>
        </div>
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
                console.log("image path:", path);
                return (
                  <div className="container-fluid row" key={element._id}>
                    {/* // image figcaption */}
                    <figure className="figure col-3" >
                      <Image
                        src={path}
                        width={200}
                        height={200}
                        className="mt-4 figure-img img-fluid rounded"
                        alt="Hello"
                        style={{ border: "2px solid grey",height:360,width:700 }}
                      />
                      <figcaption className="figure-caption">
                        <h5 className="text-dark text-center">
                         {element.productName}
                        </h5>
                        {/* <h5>Category: {element.category}</h5> */}
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
                      <p className="h5 mt-3 text-left container-fluid">
                        {element.desc}
                      </p>
                    </div>
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
