"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaShoppingCart, FaUser } from "react-icons/fa";
import styles from "../components/styles/Navbar2.module.css";

// ===================================================

import "./styles/Navbar.css";
import { TiShoppingCart } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { CartState } from "@/context/Context";
import { motion, useAnimation } from "framer-motion";
import { PiUserCircleGearFill } from "react-icons/pi";
import { FaUserCheck } from "react-icons/fa6";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";

const CustomNavbar= () => {
  const router = useRouter();
  const [navCollections, setNavCollections] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [isLoginClicked, setIsLoginClicked] = useState(false);

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

  async function getData() {
    let data = await fetch("api/collections");
    data = await data.json();
    await setNavCollections(data);
  }

  useEffect(() => {
    const object = {
      data: {},
      status: false,
    };

    let flag = localStorage.getItem("saved");
    if (!flag) {
      const stringifyObject = JSON.stringify(object);
      localStorage.setItem("loginStatus", stringifyObject);
      localStorage.setItem("saved", "true");
    } else {
      const item = localStorage.getItem("loginStatus");
      const loginInfo = JSON.parse(item);
      setUserDetails(loginInfo);
    }
  }, []);

  // ==========================================================

  let [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check and set the screen size
    const handleWindowSizeChange = () => {
      const windowWidth = window.innerWidth;
      // You can set a threshold value for mobile/desktop switch
      const isMobileSize = windowWidth <= 768;

      setIsMobile(isMobileSize);
    };

    // Initial check on component mount
    handleWindowSizeChange();

    // Event listener for screen size changes
    window.addEventListener("resize", handleWindowSizeChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      {/* Left side - Logo */}
      <div className={styles.logoContainer}>
        {isMobile ? (
          <button
            style={{ border: "none", backgroundColor: "whitesmoke" }}
            className={styles.iconButton}
            onClick={toggleMobileMenu}
          >
            <FaBars style={{ fontSize: 24 }} />
          </button>
        ) : null}

        {/* Desktop content that hides on mobile */}

        {!isMobile ? (
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              listStyleType: "none",
              gap: 10,
            }}
          >
            <li>
              <Link
                className="navbar-brand text-light btnhover ms-auto"
                style={{ width: 200, display: "inline" }}
                href="/"
              >
                <Image src="/logo.png" alt="logo" width="100" height="100" />
              </Link>
            </li>
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
                  <Link className="dropdown-item text-dark" href="/products">
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
        ) : (
          <Link
            className="navbar-brand text-light btnhover ms-auto"
            style={{ width: 200, display: "inline" }}
            href="/"
          >
            <Image src="/logo.png" alt="logo" width="100" height="100" />
          </Link>
        )}

        {/* Desktop content end */}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            {/* toggle content */}

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
                    <Link className="dropdown-item text-dark" href="/products">
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
          </div>
        )}
      </div>

      {/* right side ===================================== */}
      {/* Right side - Cart and Login buttons */}

      <div className={styles.rightSection}>
        {/* Desktop view */}
        <div className={styles.desktopButtons}>
          <div>
            <div
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
                top: 10,
                right: 88,
              }}
            >
              {cart.length}
            </div>
            <Link href="/Cart" className={styles.iconButton} >
              <FaShoppingCart style={{ fontSize: 40, color: "brown" }} />
            </Link>
          </div>

          <div
            className={styles.iconButton}
            onClick={() => setIsLoginClicked(!isLoginClicked)}
          >
            <FaUser style={{ fontSize: 40, color: "brown", marginRight: 20 }} />
          </div>
          {/* login status */}
          {isLoginClicked ? (
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
              
            >
              {userDetails.status ? (
                <div style={{ margin: 0, marginBottom: 10, }}>
                  <div>
                    <h2>
                      <FaCircleUser style={{ fontSize: 35, marginRight: 10 }} />
                      {userDetails.data.username}
                    </h2>
                  </div>
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
                <div style={{ margin: 0, marginBottom: 10,}}>
                  <h5>Currently, You are not logged in!</h5>
                  <Link href="/login" style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        width: 100,
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "brown",
                        color: "white",
                        borderRadius: 6,
                      }}
                    >
                      Login
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ) : null}
          {/* login end */}
        </div>

        {/* Mobile view */}
        <div className={styles.mobileButtons}>
          <div>
            <div
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
                top: 3,
                right: 76,
              }}
            >
              {cart.length}
            </div>
            <Link href="/Cart" className={styles.iconButton}>
              <FaShoppingCart style={{ fontSize: 40, color: "brown" }} />
            </Link>
          </div>

          <div style={{marginRight:10}}
            className={styles.iconButton}
            onClick={() => setIsLoginClicked(!isLoginClicked)}
          >
            <FaUser style={{ fontSize: 40, color: "brown" }} />
          </div>
          {/* login status */}
          {isLoginClicked ? (
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
                  <div>
                    <h2>
                      <FaCircleUser style={{ fontSize: 35, marginRight: 10 }} />
                      {userDetails.data.username}
                    </h2>
                  </div>
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
                  <Link href="/login" style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        width: 100,
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "brown",
                        color: "white",
                        borderRadius: 6,
                      }}
                    >
                      Login
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ) : null}
          {/* login end */}
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
