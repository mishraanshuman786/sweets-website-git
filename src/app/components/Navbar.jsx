"use client";
import React, { useState, useEffect } from "react";
import "./styles/Navbar.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  return (
    <div className="sticky-top">
      <nav
        style={{ backgroundColor: "rgb(68, 2, 2)" }}
        className="navbar navbar-expand-lg "
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-light" href="#">
            Logo
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
              <li className="nav-item">
                <Link
                  className="nav-link active text-light"
                  aria-current="page"
                  href="/blog"
                >
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" href="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle bg-success text-light"
                  href="/products"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
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
            </ul>

            <button
              type="button"
              className="btn btn-success"
              onClick={() => router.push("/login")}
            >
              Login
            </button>

            {/* button */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
