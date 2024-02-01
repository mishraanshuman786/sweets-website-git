"use client";
import React, { useState, useEffect } from "react";
import CustomNavbar from "./components/CustomNavbar";
import Footer from "./components/Footer";
import "./components/styles/page.css";
import Link from "next/link";
import Slider from "./components/Slider";
import { CartState } from "@/context/Context";
import { useRouter } from "next/navigation";

// import Popup from "./components/Popup";
import ReviewSlider from "./components/ReviewSlider";
import ProductSlider from "./components/ProductSlider";

export default function Homepage() {
  const router = useRouter();
 
  useEffect(() => {
    getCollections();
    // getProducts();
    getLaddooDesighee();
    getLaddooSugerfree();
  }, []);

  useEffect(() => {
    getCollections();
    // getProducts();
    getLaddooDesighee();
    getLaddooSugerfree();
  }, []);

  const [collections, setCollections] = useState();
  // const [navProducts, setNavProducts] = useState();
  const [laddooDesighee, setLaddooDesighee] = useState();
  const [laddooSugerfree, setLaddooSugerfree] = useState();
  // const [showPopup, setShowPopup] = useState(true);

  // =============================================================================
  // cart data
  const {
    state: { loginStatus },
    dispatch,
  } = CartState();

  console.log("first:", collections);
  console.log("login status:", loginStatus);
  async function getCollections() {
    let collectionData = await fetch("api/collections");
    collectionData = await collectionData.json();
    await setCollections(collectionData);
  }

  async function getLaddooDesighee() {
    let api = `api/collections/656daabf41ff1afeaba93473`;
    let collection1 = await fetch(api);
    collection1 = await collection1.json();
    await setLaddooDesighee(collection1);
  }

  async function getLaddooSugerfree() {
    let api = `api/collections/656dab9341ff1afeaba93474`;
    let collection2 = await fetch(api);
    collection2 = await collection2.json();
    await setLaddooSugerfree(collection2);
  }

  // fetching review and rating from products to show the slider in the homepage
  

  // ===========================================

  return (
    <div style={{ backgroundColor: "#FFEBEE",marginTop:170 }}>
      <div >
        {/* Navbar */}
        <CustomNavbar />
      </div>

  
      {/* =================================================================== */}

   
      <div>
        <Slider />
      </div>

      <div style={{ backgroundColor: "#FFEBEE" }}>
        {/* categories */}
        <div>
          <div>
            <h3 style={{ color: "brown", padding: 10 }}>
              Curated Collections In Trend
            </h3>
          </div>
          {/* horizontal cards */}
          <div className="collection" style={{ display: "flex" }}>
            {collections ? (
              collections.result.map((element) => {
                let path = `collectionsImages/${element.image}.jpg`;
                let url = `/categoryProducts/${element._id}`;
                return (
                  <div className="collectionimagecontainer" key={element._id}>
                    <Link href={url} style={{ textDecoration: "none" }}>
                      <img src={path} />
                      <h5
                        style={{
                          marginTop: 10,
                          color: "brown",
                          textAlign: "center",
                        }}
                      >
                        {element.name.substring(0, 20)}..
                      </h5>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* category */}

        <hr />

       
        <hr />
        {/* laddo desighee collections products*/}
        <ProductSlider
          data={laddooDesighee}
          title="Laddoo Desighee Collections"
          index={0}
        />
        <hr />
        {/* laddo sugerfree collections products*/}
        <ProductSlider
          data={laddooSugerfree}
          title="Laddoo Sugerfree Collections"
          index={1}
        />
        <hr />
        {/* Description */}
        <div className="container">
          <h2 style={{ textAlign: "center", color: "brown" }}>
            Ladoo Story- Flavours of India
          </h2>
          
          <p
            style={{
              textAlign: "justify",
              padding: 12,
              color: "black",
              fontSize: 18,
            }}
          >
            Hello laddoos lovers , Your most welcome in LADDOO STORY family,Our
            ‘Homemade’ box of Laddoos, carries a ‘token of love’ for you, your
            family & friends. Yes, it is indeed a ‘token of love’ because we at
            Simply Laddoos nurture our sweets with love combined with finest
            ingredients cooked in very hygienic conditions. Every piece promises
            to deliver you satisfaction of the cost. These little gems will
            tickle your palate and leave you wanting for more. All our sweets
            are cooked in ‘Desi Ghee’ incorporating traditional methods of
            cooking. Our Laddoos are free from additives, needs no refrigeration
            and have long shelf life. ‘Laddu Story’ gives you a trust of purity,
            combined with ‘Homemade’ taste. Hope you enjoy our sweets and
            remember us in your blessings. We are sell sugar or without sugar
            laddu on your order YES! We mean that, because that’s what you are
            buying in the form of sweet in every other sweet shop. Our Laddus
            are made with all-natural Jaggery and Ghee.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h5>FSSAI License- 122222999000322</h5>
            <button
              onClick={() => router.push("/https://wa.me/917706087842")}
              style={{
                width: "60%",
                height: 60,
                borderRadius: 6,
                fontSize: 18,
                color: "white",
                margin: 10,
                border: "none",
                backgroundColor: "brown",
              }}
            >
              Explore More
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================= */}

      {/* slider for showing review and rating */}
      <ReviewSlider  />

      {/* =============================================================== */}

      {/* Join our community */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f04e13",
          color: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ marginBottom: 20, marginTop: 20 }}>Join Our Community!</h2>
        <h6 style={{ textAlign: "center" }}>
          Get your dose of sweetness with our naturally sweetened treats!
          Subscribe now to stay in the loop on new launches and promotions!
        </h6>
        <input
          type="email"
          placeholder="Your email"
          style={{
            border: "none",
            width: "90%",
            height: 65,
            fontSize: 20,
            color: "black",
            paddingLeft: 10,
            borderRadius: 6,
          }}
        />
        <button
          style={{
            width: "90%",
            height: 65,
            fontSize: 20,
            color: "white",
            backgroundColor: "brown",
            borderRadius: 6,
            border: "none",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Subscribe
        </button>
      </div>

      {/* slider footer */}
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active footerSlide bg-dark "
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            class="footerSlide  bg-dark "
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            class="footerSlide bg-dark"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active" style={{ height: 250 }}>
            {/* content */}
            <div
              style={{
                width: 50,
                height: 50,
                margin: "auto",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <svg focusable="false" viewBox="0 0 24 22" role="presentation">
                <g
                  transform="translate(1 1)"
                  stroke-width="1.5"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <path
                    d="M5 10H2M5 15H4"
                    stroke="#761700"
                    stroke-linecap="square"
                  ></path>
                  <path
                    stroke="#761700"
                    d="M16.829 16H22v-6l-4-2-1-4H9v12h2.171"
                  ></path>
                  <path
                    d="M0 5h5"
                    stroke="#761700"
                    stroke-linecap="square"
                  ></path>
                  <path
                    stroke="#761700"
                    stroke-linecap="square"
                    d="M0 0h9v4"
                  ></path>
                  <circle
                    stroke="#761700"
                    stroke-linecap="square"
                    cx="14"
                    cy="17"
                    r="3"
                  ></circle>
                  <path
                    stroke="#761700"
                    stroke-linecap="square"
                    d="M13 7v2h2"
                  ></path>
                </g>
              </svg>
            </div>
            <div style={{ textAlign: "center" }}>
              <h5 style={{ color: "brown" }}>
                Fastest Shiping And Better Handling
              </h5>
              <h5 style={{ color: "black" }}>
                Delivery through reputed courier companies
              </h5>
            </div>
          </div>
          <div class="carousel-item" style={{ height: 250 }}>
            <div
              style={{
                width: 50,
                height: 50,
                margin: "auto",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <svg focusable="false" viewBox="0 0 24 24" role="presentation">
                <g
                  stroke-width="1.5"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="square"
                >
                  <path
                    d="M10 17H4c-1.7 0-3 1.3-3 3v3h12v-3c0-1.7-1.3-3-3-3zM7 14c-1.7 0-3-1.3-3-3v-1c0-1.7 1.3-3 3-3s3 1.3 3 3v1c0 1.7-1.3 3-3 3z"
                    stroke="#761700"
                  ></path>
                  <path stroke="#761700" d="M13 1v10l4-3h6V1z"></path>
                </g>
              </svg>
            </div>
            <div style={{ textAlign: "center" }}>
              <h5 style={{ color: "brown" }}>Top-notch support</h5>
              <h5 style={{ color: "black" }}>
                Highly Motivated Support Executives
              </h5>
            </div>
          </div>
          <div class="carousel-item" style={{ height: 250 }}>
            <div
              style={{
                width: 50,
                height: 50,
                margin: "auto",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <svg focusable="false" viewBox="0 0 24 24" role="presentation">
                <g
                  stroke-width="1.5"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="square"
                >
                  <path
                    d="M1 5h22M1 9h22M9 17H3c-1.105 0-2-.895-2-2V3c0-1.105.895-2 2-2h18c1.105 0 2 .895 2 2v10M5 13h5"
                    stroke="#761700"
                  ></path>
                  <path
                    stroke="#761700"
                    d="M13 16h8v7h-8zM15 16v-2c0-1.1.9-2 2-2s2 .9 2 2v2M17 19v1"
                  ></path>
                </g>
              </svg>
            </div>
            <div style={{ textAlign: "center" }}>
              <h5 style={{ color: "brown" }}>Secure Payments</h5>
              <h5 style={{ color: "black" }}>
                Transaction through reputed and trustworthy payment gateway.
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
