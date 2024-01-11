"use client";
import React, { useState, useEffect } from "react";
import "./styles/Navbar.css";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartState } from "@/context/Context";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { PiUserCircleGearFill } from "react-icons/pi";
import { FaUserCheck } from "react-icons/fa6";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  const [navCollections, setNavCollections] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [isCartHovered, setIsCartHovered] = useState(false);

  // cart state context
  const {
    state: { cart, loginStatus },
    dispatch,
  } = CartState();

  // Use useAnimation hook to control the animation
  const controls = useAnimation();

  // Use useEffect to trigger the animation on component mount
  useEffect(() => {
    controls.start({ y: 0, opacity: 1, transition: { duration: 0.5 } });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  useEffect(() => {
    getData();
  }, [navCollections]);

  // // fetching the user data
  // useEffect(()=>{
  //   getUsername();
  // },[userDetails]);

  // async function getUsername(){
  //   const response = await axios("/api/users/user", {
  //     method: "POST", // or other HTTP method
  //     data: loginStatus.email,
  //   });
  //   setUserDetails(response);
  // }

  async function getData() {
    let data = await fetch("api/collections");
    data = await data.json();
    await setNavCollections(data);
  }

  useEffect(() => {
    const object={
      data:{},
      status:false
    }
    const stringifyObject=JSON.stringify(object);
    localStorage.setItem("loginStatus",stringifyObject);
    const item = localStorage.getItem("loginStatus");
    const loginInfo = JSON.parse(item);
    setUserDetails(loginInfo);
  }, []);

 
  return (
    // Use motion.div for the animated container
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        width: "100%",
        zIndex: 100,
        background: "white",
        top: 38,
      }}
    >
      <div>
        <nav
          style={{ backgroundColor: "whitesmoke", border: "1px solid grey" }}
          className="navbar navbar-expand-lg "
        >
          <div className="container-fluid">
            <Link className="navbar-brand text-light btnhover" href="/">
              {/* Apply the bounce effect to the logo */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Image src="/logo.png" alt="logo" width="100" height="100" />
              </motion.div>
            </Link>
            <button
              className="navbar-toggler "
              style={{ backgroundColor: "brown", borderColor: "brown" }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span
                className="navbar-toggler-icon"
                style={{ color: "brown" }}
              ></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="/products"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      borderRadius: 6,
                      color: "brown",
                      fontSize: 24,
                      fontWeight: "bold",
                    }}
                  >
                    Category
                  </Link>
                  <ul
                    className="dropdown-menu"
                    style={{
                      zIndex: 10,
                      width: 370,
                      overflow: "hidden",
                      backgroundColor: "whitesmoke",
                    }}
                  >
                    {/* dynamic content */}
                    {navCollections &&
                    navCollections.result &&
                    Array.isArray(navCollections.result)
                      ? navCollections.result.map((element) => {
                          let url = `/categoryProducts/${element._id}`;
                          return (
                            <li key={element._id}>
                              <Link
                                className="dropdown-item"
                                style={{ color: "brown" }}
                                href={url}
                              >
                                {element.name}
                              </Link>
                            </li>
                          );
                        })
                      : null}
                    <li>
                      <hr className="dropdown-divider text-dark" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-dark"
                        href="/products"
                      >
                        All Products
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link  btnhover"
                    style={{ color: "brown", fontSize: 24, fontWeight: "bold" }}
                    href="/contact"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link  btnhover"
                    style={{ color: "brown", fontSize: 24, fontWeight: "bold" }}
                    href="/about"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
              {/* cart Component */}
              {/* Apply the bounce effect to the cart icon */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <div style={{ position: "relative" }}>
                  <div
                    className="btnhover"
                    style={{
                      position: "absolute",
                      backgroundColor: "brown",
                      color: "white",
                      width: 30,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 18,
                      fontWeight: "bold",
                      left: 30,
                      top: 5,
                    }}
                  >
                    {cart.length}
                  </div>

                  <Link
                    type="button"
                    className="btn"
                    href="/Cart"
                    role="button"
                    aria-expanded="false"
                    style={{ backgroundColor: "whitesmoke" }}
                  >
                    <span style={{ fontSize: 60, color: "brown" }}>
                      <TiShoppingCart />
                    </span>
                  </Link>
                </div>
              </motion.div>

              {/* cart component end */}
              <motion.div
                style={{ position: "relative" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  type="button"
                  className="btn me-5"
                  onClick={() => router.push("/login")}
                  style={{
                    backgroundColor: "whitesmoke",
                    color: "brown",
                    zIndex: 100,
                  }}
                  onMouseEnter={() => setIsCartHovered(true)}
                  onMouseLeave={() => setIsCartHovered(false)}
                >
                  {userDetails.status ? (
                    <FaUserCheck style={{ fontSize: 70 }} />
                  ) : (
                    <PiUserCircleGearFill style={{ fontSize: 70 }} />
                  )}
                </button>
              </motion.div>
              {/* login status */}
              {isCartHovered ? (
                <div
                  className="login-status"
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    width: 400,
                    right: 6,
                    top: 115,
                    height: 200,
                    padding: 10,

                    borderRadius: 6,
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Add a subtle box shadow
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={() => setIsCartHovered(true)}
                  onMouseLeave={() => setIsCartHovered(false)}
                >
                  {userDetails.status ? (
                    <div style={{ margin: 0, marginBottom: 10 }}>
                      <h5>Thank You for Logging In.</h5>
                      <button
                        style={{
                          backgroundColor: "brown",
                          color: "white",
                          padding: "8px 16px",
                          borderRadius: 4,
                          cursor: "pointer",
                        }}
                        onClick={async () => {
                          // Handle logout logic here
                          const object = {
                            id: userDetails.data.id,
                            cart: cart,
                          };

                          const response = await axios.post(
                            "api/users/logout",
                            object
                          );

                          // Retrieve the current state from localStorage
                          const existingLoginStatusString =
                            localStorage.getItem("loginStatus");
                          const existingLoginStatus =
                            JSON.parse(existingLoginStatusString) || {};

                          // Modify the data
                          existingLoginStatus.data = {};
                          existingLoginStatus.status = false;

                          // Update localStorage with the modified data
                          const updatedLoginStatusString =
                            JSON.stringify(existingLoginStatus);
                          localStorage.setItem(
                            "loginStatus",
                            updatedLoginStatusString
                          );
                          setUserDetails(JSON.parse(updatedLoginStatusString));
                          console.log("Logout response:", response);
                        }}
                      >
                        LogOut
                      </button>
                    </div>
                  ) : (
                    <div style={{ margin: 0, marginBottom: 10 }}>
                      <h5>Currently, You are not logged in!</h5>
                    </div>
                  )}
                </div>
              ) : null}

              {/* <div>
            <Link  href={"https://www.facebook.com/profile.php?id=61554135820905&mibextid=kFxxJD"} > <ImFacebook2 className="btnhover"  style={{width:40,height:33,color:"brown"}}/></Link>
        <Link  href={"https://www.instagram.com/laddoo_story_varanasi?igsh=MTl2aXJwdHozdTc2dw=="} ><FaInstagramSquare className="btnhover" style={{width:40,height:40,color:"brown"}} /></Link>
      
       
        </div> */}

              {/* button */}
            </div>
          </div>
        </nav>
      </div>
    </motion.div>
  );
};

export default Navbar;
