"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./components/styles/page.css";

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
    <div className="background">
      {/* Navbar */}
      <Navbar />
      {/* =================================================================== */}

      <div className="content" >
        {navProducts
          ? navProducts.result.map((element) => {
              let path = `/ProductImages/${element.images[0]}.jpg`;

              return (
                <div key={element._id} className="card">
                  <Image
                    src={path}
                    alt="product"
                    width={180}
                    height={100}
                    className="image rounded-md"
                  />
                  <h1 className="product-name">{element.productName}</h1>
                </div>
              );
            })
          : null}
      </div>
      <div>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
