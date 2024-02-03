import React from 'react'
import styles from "./shiping-policy.module.css";
import Footer from '../components/Footer';
import CustomNavbar from '../components/CustomNavbar';
import Link from "next/link";
function ShipingPolicy() {
  return (
    <div style={{marginTop:200}}>
      {/* Navbar component */}
      <CustomNavbar/>
      {/* =================================== */}

    <div className={styles.body}>
         <h2 className={styles.h2}>Shipping Terms and Conditions</h2>
    <p className={styles.p}><strong>VARANASI:</strong> Only 24 HOURS after we dispatch the order.</p>
    <p className={styles.p}><strong>JAUNPUR / MIRZAPUR / GOPIGANJ / CHANDAULI / GORAKHPUR / PRAYAGRAJ:</strong> Delivery in 1-3 days.</p>
    <p className={styles.p}><strong>METRO CITIES:</strong> Delivery in 3-7 business days after we dispatch the order.</p>
    <p className={styles.p}><strong>OTHER CITIES IN INDIA:</strong> Delivery in 3-7 business days after we dispatch the order.</p>
    <p className={styles.p}><strong>INTERNATIONAL:</strong> Delivery in 8-14 business days after we dispatch the order.</p>
    <p className={styles.p}>All orders placed before 4 PM are prepared and dispatched the same day. There will be no dispatch on Sundays and Public Holidays.</p>
    <p className={styles.p}>We have a partnership with the most reputed courier companies (DHL, Blue Dart, DTDC, Delivery, etc.) to ensure fast and safe transit of your products so that they reach fresh and in the best condition.</p>
    <p className={styles.p}><strong>Important:</strong> For International deliveries, in few countries custom charges might be levied which are payable by the recipient.</p>
    <p className={styles.p}><strong>Kindly Note:</strong></p>
    <ul>
        <li>Delivery will be attempted by courier partner at the address given by Customer.</li>
        <li>If the product is not delivered due to wrong address, no one to collect the parcel, or any other reason, the product will return back to origin. Since these are perishable products, the amount will not be refunded because of such issues.</li>
        <li>Any change in address after the dispatch is done will not be entertained. Due to some unavoidable reason if the address change is accepted by the team, the charges will be separate.</li>
        <li>Once the issue is resolved, it will not be entertained again for any future references.</li>
        <li>Delivery date is provisional as it is shipped through third party courier partners.</li>
        <li>Delivery may not be possible on Sundays and National Holidays.</li>
        <li>In the event the delivery is not executed during the attempts, you shall still be charged for the order.</li>
        <li>We will consider the order executed in the below cases:
            <ul>
                <li>Wrong shipping/delivery address.</li>
                <li>Recipient not available.</li>
                <li>Recipient refusing to accept the delivery.</li>
                <li>Premises locked.</li>
            </ul>
        </li>
    </ul>
    </div>

    

    {/* footer component */}
    <Footer/>
    </div>
  )
}

export default ShipingPolicy;