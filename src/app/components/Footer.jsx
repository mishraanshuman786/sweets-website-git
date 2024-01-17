"use client";
import Link from "next/link";
import "./styles/footer.css";
import { FaInstagramSquare } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import React, { useState, useEffect } from "react";
export default function Footer() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <div style={{ backgroundColor: "brown", color: "white" }}>
      {/* accordian */}

      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item" style={{ backgroundColor: "brown" }}>
          <h2 class="accordion-header" id="flush-headingOne">
            <button
              class="accordion-button collapsed"
              style={{
                backgroundColor: "brown",
                paddingRight: 50,
                color: "white",
                marginLeft: 10,
              }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Ladoo Story
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body" style={{ color: "white" }}>
              We source these authentic desi flavours and regional savours from
              the best regional vendors who are known for generations for these
              amazing delicacies. The name LaddooStory is comes from the Sweets and flavours which are Traditional,
              Authentic, Unadulterated with no preservatives. In the current
              busy and hectic life, the ready availability of our hometown
              flavours gives us a nostalgic feeling and closeness to our roots.
            </div>
          </div>
        </div>
        <div class="accordion-item" style={{ backgroundColor: "brown" }}>
          <h2 class="accordion-header" id="flush-headingTwo">
            <button
              class="accordion-button collapsed"
              style={{
                outline: "none",
                backgroundColor: "brown",
                color: "white",
                paddingRight: 50,
                marginLeft: 10,
              }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Quick Links
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body" style={{ color: "white" }}>
            <div>
          <h5>Quicklinks</h5>
          <ul
            style={{
              display: "flex",
              flexDirection:'column',
              listStyleType: "none",
              justifyContent: "flex-start",

            }}
          >
            <li style={{ marginRight: "5%" }}><Link style={{textDecoration:"none",color:"white"}} href="/about">About Us</Link></li>
            <li style={{ marginRight: "5%" }}><Link style={{textDecoration:"none",color:"white"}} href="/contact">Contact Us</Link></li>
            <li style={{ marginRight: "5%" }}><Link style={{textDecoration:"none",color:"white"}} href="/privacyPolicy">Privacy Policy</Link></li>
            <li style={{ marginRight: "5%" }}><Link style={{textDecoration:"none",color:"white"}} href="/refundPolicy">Refund Policy</Link></li>
            <li style={{ marginRight: "5%" }}><Link style={{textDecoration:"none",color:"white"}} href="/shiping-policy">Shiping Policy</Link></li>
            <li style={{ marginRight: "5%" }}><Link style={{textDecoration:"none",color:"white"}} href="/termsOfService">Terms Of Service</Link></li>
          </ul>
        </div>
            </div>
          </div>
        </div>
        <div class="accordion-item" style={{ backgroundColor: "brown" }}>
          <h2 class="accordion-header" id="flush-headingThree">
            <button
              class="accordion-button collapsed"
              style={{
                backgroundColor: "brown",
                border: "none",
                color: "white",
                paddingRight: 50,
                marginLeft: 10,
              }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              Get In Touch With Us
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body" style={{ color: "white",width:'100%' }}>
            <h5>Get In Touch With Us</h5>
          <p>
            Customer Care - 6307010388 ( Mon-Sat : 9 AM to 7 PM ) <br></br>
            Email : journywithabhipandit@gmail.com , indiankissanvns@gmail.com<br></br>
            Address: S-28/56 R-9 Anula Mahadev Nagar Colony, Varanasi 
          </p>
            </div>
          </div>
        </div>
      </div>
      {/* desktop size content */}
      <div className="desktop-content">
        <div>
          <h5>Ladoo Store</h5>
          <p>
            We source these authentic desi flavours and regional savours from
            the best regional vendors who are known for generations for these
            amazing delicacies. The name LaddooStory is comes from the Sweets and flavours which are Traditional, Authentic,
            Unadulterated with no preservatives. In the current busy and hectic
            life, the ready availability of our hometown flavours gives us a
            nostalgic feeling and closeness to our roots.
          </p>
        </div>
        <hr />
        <div>
          <h5>Quicklinks</h5>
          <ul
            style={{
              display: "flex",
              listStyleType: "none",
              justifyContent: "flex-start",
            }}
          >
            <li style={{ marginRight: "5%" }}><Link style={{textDecoration:"none",color:"white"}} href="/about">About Us</Link></li>
            <li style={{ marginRight: "5%" }}><Link style={{textDecoration:"none",color:"white"}} href="/contact">Contact Us</Link></li>
            <li style={{ marginRight: "5%" }}><Link style={{textDecoration:"none",color:"white"}} href="/privacyPolicy">Privacy Policy</Link></li>
            <li style={{ marginRight: "5%" }}><Link style={{textDecoration:"none",color:"white"}} href="/refundPolicy">Refund Policy</Link></li>
            <li style={{ marginRight: "5%" }}><Link style={{textDecoration:"none",color:"white"}} href="/shiping-policy">Shiping Policy</Link></li>
            <li style={{ marginRight: "5%" }}><Link style={{textDecoration:"none",color:"white"}} href="/termsOfService">Terms Of Service</Link></li>
          </ul>
        </div>
        <hr />
        <div>
          <h5>Get In Touch With Us</h5>
          <p>
            Customer Care - 6307010388 ( Mon-Sat : 9 AM to 7 PM ) <br></br>
            Email : journywithabhipandit@gmail.com , indiankissanvns@gmail.com<br></br>
            Address: S-28/56 R-9 Anula Mahadev Nagar Colony, Varanasi 
          </p>
        </div>
      </div>

      {/* addition footer part */}
      <div
        className="container-fluid"
        style={{ backgroundColor: "brown", color: "white" }}
      >
        <hr></hr>
        <div className="d-md-flex justify-content-between">
          <div>
            <h6>@2023 Ladoo Story</h6>
            <h6>All Rights Reserverd</h6>
          </div>

          <div>
            <h6>Follow Us</h6>
            <div>

              <Link style={{borderRadius:20,textDecoration:"none"}} href={"https://www.instagram.com/laddoo_story_varanasi?igsh=MTl2aXJwdHozdTc2dw=="}>
                <FaInstagramSquare
                  style={{ width: 40, height: 60, color: "white"}}
                />
              </Link>
              <Link style={{textDecoration:"none"}} href={"https://www.facebook.com/profile.php?id=61554135820905&mibextid=kFxxJD"}>
                {" "}
                <ImFacebook2
                  style={{ width: 40, height: 60, color: "white" }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
