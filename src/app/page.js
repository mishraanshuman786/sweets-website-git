"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./components/styles/page.css";
import Link from "next/link";

export default function Homepage() {
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
    <div style={{backgroundColor:"wheat"}}>
      {/* Navbar */}
      <Navbar />
      {/* =================================================================== */}

      <div className="container bg-success py-2" style={{ backgroundColor: "wheat"}}>
        <div className="row">
          {navProducts
            ? navProducts.result.map((element) => {
                let path = `/ProductImages/${element.images[0]}.jpg`;
                let productsPath = `/products/${element._id}`;

                return (
                  <Link key={element._id} href={productsPath} style={{textDecoration:"none"}} className="col-xl-4 col-md-6">
                    <div
                      className="responsive-card h-20  card mx-auto bg-dark my-4 w-sm-2"
                      key={element._id}
                      style={{
                        width: "20rem",
                        height: "22rem",
                        textAlign: "center",
                      }}
                    >
                      <Image
                        src={path}
                        alt="product"
                        width={400}
                        height={300}
                        className="card-img-top mx-auto responsive-image"
                      />
                      <div class="card-body text-center">
                        <h5 class="card-title text-light">
                          {element.productName}
                        </h5>
                      </div>
                    </div>
                  </Link>
                );
              })
            : null}
        </div>
      </div>
      {/* Footer */}
        <Footer />
      
    </div>
  );
}
