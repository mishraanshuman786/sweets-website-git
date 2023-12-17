"use client";
import React, { useState, useEffect } from "react";
import "./styles/Navbar.css";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartState } from "@/context/Context";
import { FaInstagramSquare } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";


const Navbar = () => {
  const router = useRouter();
  const [navProducts, setNavProducts] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  useEffect(() => {
    getData();
  }, [navProducts]);

  async function getData() {
    let data = await fetch("api/products");
    data = await data.json();
    await setNavProducts(data);
  }

  // fetching cartdata from CartState

  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div>
      <nav
        style={{ backgroundColor: "#761700" }}
        className="navbar navbar-expand-lg "
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-light btnhover" href="/">
           LADOO STORY
          </Link>
          <button
            className="navbar-toggler bg-light text-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle bg-success text-light"
                  href="/products"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{borderRadius:6}}
                >
                  Products
                </Link>
                <ul className="dropdown-menu" style={{ zIndex: 10 }}>
                  {/* dynamic content */}
                  {navProducts
                    ? navProducts.result.map((element) => {
                        let url = `/products/${element._id}`;
                        return (
                          <li key={element._id}>
                            <Link
                              className="dropdown-item text-dark"
                              href={url}
                            >
                              {element.productName}
                            </Link>
                          </li>
                        );
                      })
                    : (null)}
                  <li>
                    <hr className="dropdown-divider text-dark" />
                  </li>
                  <li>
                    <Link className="dropdown-item text-dark" href="/products">
                      All Products
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light btnhover" href="/Cart">
                  My Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light btnhover" href="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light btnhover" href="/contact">
                  About Us
                </Link>
              </li>
            </ul>
            {/* cart Component */}

            <div class="dropdown dropleft me-2">
              <button
                type="button"
                className="btn btn-success  dropdown-toggle"
                href="/products"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span style={{ fontSize: 20 }}>
                  <TiShoppingCart />
                </span>
                Cart Items
              </button>
              <div
                className="dropdown-menu" 
                style={{
                  width: 305,
                  color: "#273746",
                  position:"absolute",
                  right:20,
                  backgroundColor:"whitesmoke"
                }}
              >
                <h4>Cart items:{cart.length}</h4>
                
                <h4>Cart Items:</h4>
                {cart.map((item) => {
                  let id=item._id;
                  return (
                    <div key={item._id} style={{backgroundColor:"grey",padding:10,margin:5,borderRadius:6,border:"1px solid black",color:"white"}}>
                      <h5>{item.productName}</h5>
                      <button
                        type="button"
                        className="btn btn-danger outline"
                        role="button"
                     onClick={()=>dispatch({ type: 'REMOVE_FROM_CART',payload:{id:id} })}
                      >
                      Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* cart component end */}

            <button
              type="button"
              className="btn btn-success me-5"
              onClick={() => router.push("/login")}
            >
              Login
            </button>

            <div>
        <Link  href={"https://www.instagram.com/"} ><FaInstagramSquare className="btnhover" style={{width:40,height:60,color:"white"}} /></Link>
        <Link  href={"https://www.facebook.com/"} > <ImFacebook2 className="btnhover"  style={{width:40,height:60,color:"white"}}/></Link>
       
        </div>

            {/* button */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
