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
          <button style={{width:"60%",height:60,borderRadius:6,fontSize:18,color:"white",margin:10,border:"none",backgroundColor:"brown"}}>Explore More</button>
        </div>
      </div>

      {/* Join our community */}
      <div style={{display:"flex",flexDirection:"column",backgroundColor:"#f04e13",color:"white",alignItems:"center",justifyContent:"center"}}>
        <h2 style={{marginBottom:20,marginTop:20}}>Join Our Community!</h2>
        <h6 style={{textAlign:"center"}}>Get your dose of sweetness with our naturally sweetened treats! Subscribe now to stay in the loop on new launches and promotions!</h6>
        <input type="email" placeholder="Your email" style={{border:"none",width:"90%",height:65,fontSize:20,color:"black",paddingLeft:10,borderRadius:6}} />
        <button style={{width:"90%",height:65,fontSize:20,color:"white",backgroundColor:"brown",borderRadius:6,border:"none",marginTop:10,marginBottom:10}}>Subscribe</button>
      </div>

      {/* slider footer */}
      <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active footerSlide bg-dark "  aria-current="true"  aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" class="footerSlide  bg-dark " aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" class="footerSlide bg-dark" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" style={{height:250}}>
      {/* content */}
      <div style={{width:50,height:50,margin:"auto",marginTop:15,marginBottom:15}}>
      <svg focusable="false" viewBox="0 0 24 22" role="presentation">
      <g transform="translate(1 1)" stroke-width="1.5" fill="none" fill-rule="evenodd">
        <path d="M5 10H2M5 15H4" stroke="#761700" stroke-linecap="square"></path>
        <path stroke="#761700" d="M16.829 16H22v-6l-4-2-1-4H9v12h2.171"></path>
        <path d="M0 5h5" stroke="#761700" stroke-linecap="square"></path>
        <path stroke="#761700" stroke-linecap="square" d="M0 0h9v4"></path>
        <circle stroke="#761700" stroke-linecap="square" cx="14" cy="17" r="3"></circle>
        <path stroke="#761700" stroke-linecap="square" d="M13 7v2h2"></path>
      </g>
    </svg>
      </div>
     <div style={{textAlign:"center"}}>
      <h5 style={{color:"brown"}}>Fastest Shiping And Better Handling</h5>
      <h5 style={{color:"black"}}>Delivery through reputed courier companies</h5>
     </div>
    </div>
    <div class="carousel-item" style={{height:250}}>
      <div style={{width:50,height:50,margin:"auto",marginTop:15,marginBottom:15}}>
      <svg focusable="false" viewBox="0 0 24 24" role="presentation">
      <g stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="square">
        <path d="M10 17H4c-1.7 0-3 1.3-3 3v3h12v-3c0-1.7-1.3-3-3-3zM7 14c-1.7 0-3-1.3-3-3v-1c0-1.7 1.3-3 3-3s3 1.3 3 3v1c0 1.7-1.3 3-3 3z" stroke="#761700"></path>
        <path stroke="#761700" d="M13 1v10l4-3h6V1z"></path>
      </g>
    </svg>
      </div>
      <div style={{textAlign:"center"}}>
      <h5 style={{color:"brown"}}>Top-notch support</h5>
      <h5 style={{color:"black"}}>Highly Motivated Support Executives</h5>
     </div>
    </div>
    <div class="carousel-item" style={{height:250}}>
    <div style={{width:50,height:50,margin:"auto",marginTop:15,marginBottom:15}}>
    <svg focusable="false" viewBox="0 0 24 24" role="presentation">
      <g stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="square">
        <path d="M1 5h22M1 9h22M9 17H3c-1.105 0-2-.895-2-2V3c0-1.105.895-2 2-2h18c1.105 0 2 .895 2 2v10M5 13h5" stroke="#761700"></path>
        <path stroke="#761700" d="M13 16h8v7h-8zM15 16v-2c0-1.1.9-2 2-2s2 .9 2 2v2M17 19v1"></path>
      </g>
    </svg>
      </div>
      <div style={{textAlign:"center"}}>
      <h5 style={{color:"brown"}}>Secure Payments</h5>
      <h5 style={{color:"black"}}>Transaction through reputed and trustworthy payment gateway.</h5>
     </div>
    </div>
  </div>
 
</div>


      {/* Footer */}
      <Footer />
    </div>
  );
}
