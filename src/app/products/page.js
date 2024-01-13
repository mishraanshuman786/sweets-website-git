"use client";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import "../products/products.css";
import { motion } from "framer-motion";
import { FaRegStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import Link from "next/link";


export default function Product() {
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
    <div style={{marginTop:170}}>
      {/* Navbar */}
      <Navbar />

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
          navProducts.result.map((element) => {
            let path;
            path = `/ProductImages/${element.images[0]}.jpg`;
            let productPageUrl = `/products/${element._id}`;

            return (
              <Link href={productPageUrl} style={{textDecoration:"none"}}>
              <motion.div
                key={element._id}
                whileHover={{ scale: 1.1 }}
                className="card"
                style={{ backgroundColor: "whitesmoke", width: "320px" }}
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

                <div className="card-body" >
                  <h3
                    className="card-title text-dark text-sm"
                    style={{ textAlign: "left"}}
                  >
                    {element.productName}
                  </h3>

                  {element.category && element.category.length > 0 && element.category[element.categoryIndex].price ? (
                    <div>
                    <h5 ><span style={{textDecoration:"line-through",marginRight:4,color:"grey"}}> {element.category[element.categoryIndex].price+100}</span>{element.category[element.categoryIndex].price}</h5>
                    <div>
                        {[...Array(5)].map((_, index) => {
                          return element.category[element.categoryIndex].rating > index ? (
                            <IoStar />
                          ) : (
                            <FaRegStar />
                          );
                        })}
                      </div>
                      </div>
                  ) : (
                    null
                  )}
                  <br />
                </div>
              </motion.div>
              </Link>
            );
          })
        ) : (
          <div style={{margin:"auto",height:100}}>
          <div class="spinner-border text-warning m-auto" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          </div>
        )}

        {/* end */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
