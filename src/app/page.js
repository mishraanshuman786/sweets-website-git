"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./components/styles/page.css";
import Link from "next/link";
import Slider from "./components/Slider";
import { CgColorBucket } from "react-icons/cg";

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
    <div
      style={{
        backgroundImage: "/images/cardbackground.jpg",
        overflow: "hidden",
      }}
    >
      {/* Navbar */}
      <Navbar />
      {/* =================================================================== */}

      {/* slider
   <Slider/> */}
      <div>
        <Slider />
      </div>

      <div style={{ backgroundColor: "#FFEBEE" }}>
        {/* products */}

        <div>
          <h3 style={{ color: "brown", padding: 10 }}>
            Curated Collection in Trend
          </h3>
          <div
            style={{ display: "flex", overflow: "scroll" }}
            className="imagecontainer"
          >
            {navProducts
              ? navProducts.result.map((element) => {
                  let path = `/ProductImages/${element.images[0]}.jpg`;
                  let productsPath = `/products/${element._id}`;

                  return (
                    <Link
                      key={element._id}
                      href={productsPath}
                      style={{
                        textDecoration: "none",
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                      }}
                    >
                      <div
                        key={element._id}
                        style={{
                          width: "16rem",
                          height: "18rem",
                          textAlign: "center",
                        }}
                      >
                        <Image
                          src={path}
                          alt="product"
                          width={80}
                          height={220}
                          className="card-img-top mx-auto responsive-image"
                          style={{ borderRadius: "100%" }}
                        />
                        <div class="card-body text-center">
                          <h5
                            class="card-title"
                            style={{ color: "brown", marginTop: 10 }}
                          >
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

        {/* category */}

        <hr />

        {/* products */}

        <div>
          <h3 style={{ color: "brown", padding: 10 }}>Grab The Deals</h3>
          <div
            style={{ display: "flex", overflow: "scroll" }}
            className="imagecontainer"
          >
            {navProducts
              ? navProducts.result.map((element) => {
                  let path = `/ProductImages/${element.images[0]}.jpg`;
                  let productsPath = `/products/${element._id}`;

                  return (
                    <Link
                      key={element._id}
                      href={productsPath}
                      style={{
                        textDecoration: "none",
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        height:250
                      }}
                    >
                      <div
                        key={element._id}
                        style={{
                          width: "15rem",
                          height: "20rem",
                          textAlign: "center",
                        }}
                      >
                        <Image
                          src={path}
                          alt="product"
                          width={50}
                          height={180}
                          className="card-img-top mx-auto responsive-image"
                          style={{ borderRadius: "1%" }}
                        />
                        <div class="card-body text-center">
                          <h5
                            class="card-title"
                            style={{ color: "brown", marginTop: 10 }}
                          >
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
             <hr/>
        {/* Description */}
        <h2 style={{textAlign:"center",color:'brown'}}>Ladoo Story- Flavours of India</h2>
        <p style={{textAlign:"justify",padding:12,color:"black",fontSize:18}}>
          For a person, it is a challenging feat to distance oneself from one's
          roots, culture and the real flavors of pure laddu of one's home
          mother. Although we may physically move away from these elements, the
          nostalgia and memories remain, ultimately creating a craving for the
          familiar flavors of home. In the bustling lifestyle of big cities
          today, LADDOO STORY acts as a bridge, reviving these memories,
          nostalgia and flavors and bringing them closer to you. We are creating
          an ecosystem that takes care of both our health and taste equally. The
          name Ladoo Story originates from the combination of "LADDOO + STORY",
          representing traditional, authentic and unadulterated flavors without
          preservatives. Amidst the present busy and chaotic life, the instant
          availability of the flavors of our hometown creates a feeling of
          nostalgia and connection with our roots We believe that we should eat
          better, there are many sweets available in the market but they are
          making us sick, so homemade sweets will take care of you. We will
          take care of you.
        </p>
        <p style={{textAlign:"justify",padding:12, color:"black",fontSize:18}}>
          Hello laddoos lovers , Your most welcome in LADDOO STORY family,Our
          ‘Homemade’ box of Laddoos, carries a ‘token of love’ for you, your
          family & friends. Yes, it is indeed a ‘token of love’ because we at
          Simply Laddoos nurture our sweets with love combined with finest
          ingredients cooked in very hygienic conditions. Every piece promises
          to deliver you satisfaction of the cost. These little gems will tickle
          your palate and leave you wanting for more. All our sweets are cooked
          in ‘Desi Ghee’ incorporating traditional methods of cooking. Our
          Laddoos are free from additives, needs no refrigeration and have long
          shelf life. ‘Laddu Story’ gives you a trust of purity, combined with
          ‘Homemade’ taste. Hope you enjoy our sweets and remember us in your
          blessings. We are sell sugar or without sugar laddu on your order YES!
          We mean that, because that’s what you are buying in the form of sweet
          in every other sweet shop. Our Laddus are made with all-natural
          Jaggery and Ghee.
        </p>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <h5>FSSAI License- 122222999000322</h5>
          <button style={{width:150,height:65,borderRadius:6,fontSize:18,color:"white",margin:10,border:"none",backgroundColor:"brown"}}>Explore More</button>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
