// PrivacyPolicy.js
import CustomNavbar from '../components/CustomNavbar';
import Footer from '../components/Footer';
import React from 'react';
import styles from './PrivacyPolicy.module.css';
import Link from "next/link";

const PrivacyPolicy = () => {
    return (
        <div style={{marginTop:170}}>

            {/* Navbar */}
            <CustomNavbar />

            {/* =================================================== */}
        <div className={styles.container}>
            <h2>Privacy Policy</h2>
            <p>LADDOO STORY is committed to safeguarding the privacy of our customer&apos;s personal data. Information furnished by you while placing an order is used specifically for the purpose of execution of the order or communication with the customer. We do not distribute or sell customer data.</p>

            <p>We implement a variety of security measures when a user places an order to maintain the safety of your personal information.</p>

            <p>All payment transactions are processed through a gateway provider and are not stored or processed on our servers.</p>

            <p><strong>LADDOO STORY may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.</strong></p>
        </div>

        {/* whatsapp content */}

        <div
                className="fixed-bottom"
                style={{ marginBottom: 100, marginLeft: 1600, width: 100 }}
              >
                <Link
                  className="show-tool-tip"
                  href="https://wa.me/916307010388"
                  style={{ textDecoration: "none" }}
                  target="_blank"
                >
                  <img
                    src="/whatsapp.svg"
                    alt="whatsapp"
                    className="bounce" // Apply the bounce class here
                    style={{
                      width: 60,
                      height: 60,
                      color: "green",
                      animation: "bounce 1s infinite",
                    }} // Apply the bouncing animation
                  />
                </Link>
              </div>

        {/* footer component */}
        <Footer/>
        </div>
    );
};

export default PrivacyPolicy;
