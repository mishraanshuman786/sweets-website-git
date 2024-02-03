// RefundPolicy.js

import React from 'react';
import styles from './RefundPolicy.module.css';
import CustomNavbar from '../components/CustomNavbar';
import Footer from '../components/Footer';
import Link from "next/link";
const RefundPolicy = () => {
    return (
        <div style={{marginTop:170}}>
            {/* Navbar component */}
            <CustomNavbar />
            {/* ================================== */}
            <div className={styles.container}>
                <h2>Refund Policy</h2>
                <p>Sweets ordered cannot be refunded once confirmed and dispatched from our side.</p>

                <p>If the order is canceled before the confirmation and dispatch, the amount will be credited back to the customer’s account.</p>

                <p><strong>In case of any issues, please drop a mail to us.</strong></p>
                <p><strong>Email:</strong><span>indiankissanvns@gmail.com</span></p>
            </div>


           

            {/* Footer component */}

            <Footer />
        </div>
    );
};

export default RefundPolicy;
