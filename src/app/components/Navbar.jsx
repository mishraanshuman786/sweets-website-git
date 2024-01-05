"use client";
import React, { useState, useEffect } from "react";
import "./styles/Navbar.css";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartState } from "@/context/Context";
import { FaInstagramSquare } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import Image from "next/image";


const Navbar = () => {
  const router = useRouter();
  const [navCollections, setNavCollections] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  useEffect(() => {
    getData();
  }, [navCollections]);

  async function getData() {
    let data = await fetch("api/collections");
    data = await data.json();
    await setNavCollections(data);
  }

  // fetching cartdata from CartState

  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div>
      <nav
        style={{ backgroundColor: "whitesmoke",border:"1px solid grey"}}
        className="navbar navbar-expand-lg "
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-light btnhover" href="/">
           <Image src='/logo.png' alt='logo' width='100' height="100" />
          </Link>
          <button
            className="navbar-toggler "
            style={{backgroundColor:"brown",borderColor:"brown"}}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" style={{color:"brown"}}></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="/products"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{borderRadius:6,color:"brown",fontSize:24,fontWeight:"bold"}}
                >
                 Category
                </Link>
                <ul className="dropdown-menu" style={{ zIndex: 10,width:370,overflow:"hidden",backgroundColor:"whitesmoke" }}>
                  {/* dynamic content */}
                  {navCollections
                    ? navCollections.result.map((element) => {
                        let url = `/categoryProducts/${element._id}`;
                        return (
                          <li key={element._id}>
                            <Link
                              className="dropdown-item"
                              style={{color:"brown"}}
                              href={url}
                            >
                              {element.name}
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
                <Link className="nav-link  btnhover" style={{color:"brown",fontSize:24,fontWeight:"bold"}} href="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  btnhover" style={{color:"brown",fontSize:24,fontWeight:"bold"}}  href="/about">
                  About Us
                </Link>
              </li>
            </ul>
            {/* cart Component */}

          <div style={{position:"relative"}}>
             <div  className="btnhover" style={{position:"absolute",backgroundColor:"brown",color:"white",width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:18,fontWeight:"bold",left:30,top:5}}>
              {cart.length}
             </div>
           
              <Link
                type="button"
                className="btn"
                href="/Cart"
                role="button"
                aria-expanded="false"
                style={{backgroundColor:"whitesmoke"}}
              >
            
                <span style={{ fontSize: 60,color:"brown"}}>
                  <TiShoppingCart />
                </span>
                
              </Link>
              </div>
        
            {/* cart component end */}

            {/* <button
              type="button"
              className="btn me-5"
              onClick={() => router.push("/login")}
              style={{backgroundColor:"brown",color:"white"}}
            >
              Login
            </button>

            <div>
            <Link  href={"https://www.facebook.com/profile.php?id=61554135820905&mibextid=kFxxJD"} > <ImFacebook2 className="btnhover"  style={{width:40,height:33,color:"brown"}}/></Link>
        <Link  href={"https://www.instagram.com/laddoo_story_varanasi?igsh=MTl2aXJwdHozdTc2dw=="} ><FaInstagramSquare className="btnhover" style={{width:40,height:40,color:"brown"}} /></Link>
      
       
        </div> */}

            {/* button */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
