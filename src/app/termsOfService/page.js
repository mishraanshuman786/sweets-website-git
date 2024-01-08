// TermsOfService.js

import React from 'react';
import styles from './TermsOfService.module.css';
import Navbar from '../components/Navbar';

import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div style={{marginTop:170}}>

      {/* Navbar component */}
      <Navbar/>
    <div className={styles.container}>
      <h2>Terms of Service</h2>
      <p><strong>Services Overview</strong></p>
      <p>As part of the registration process on the Website/Application, LADDOO STORY may collect the following personally identifiable information about you; Name including first and last name, email address, mobile phone number, contact details, Address, Postal code, Lifestyle preferences, Demographic profile (like your age, gender, occupation, education, address etc.) and information about the pages on the Website/Application you visit/access, the links you click on the Website/Application, the number of times you access the page and any such browsing information.</p>

      <p><strong>Eligibility</strong></p>
      <p>Services of the Website/Application would be available to only select geographies in India. Persons who are “incompetent to contract” within the meaning of the Indian Contract Act, 1872 including un-discharged insolvents, etc. are not eligible to use the Website/Application. If you are a minor i.e. under the age of 18 years but at least 13 years of age you may use the Website/Application only under the supervision of a parent or legal guardian who agrees to be bound by these Terms of Use. If your age is below 18 years your parents or legal guardians can transact on behalf of you if they are registered users. You are prohibited from purchasing any material which is for adult consumption and the sale of which to minors is prohibited.</p>

      <p><strong>License & Website/Application Access</strong></p>
      <p>LADDOO STORY grants you a limited sub-license to access and make personal use of this Website/Application and not to download (other than page caching) or modify it, or any portion of it, except with express written consent of LADDOO STORY. This license does not include any resale or commercial use of this Website/Application or its contents; any collection and use of any product listings, descriptions, or prices; any derivative use of this Website/Application or its contents; any downloading or copying of account information for the benefit of another merchant; or any use of data mining, robots, or similar data gathering and extraction tools. This Website/Application or any portion of this Website/Application may not be reproduced, duplicated, copied, sold, resold, visited, or otherwise exploited for any commercial purpose without express written consent of LADDOO STORY. You may not frame or utilize framing techniques to enclose any trademark, logo, or other proprietary information (including images, text, page layout, or form) of the Website/Application or of LADDOO STORY and its affiliates without express written consent. You may not use any meta tags or any other “hidden text” utilizing the Website/Application’s or LADDOO STORY name or trademarks without the express written consent of LADDOO STORY. Any unauthorized use terminates the permission or license granted by LADDOO STORY.
      </p>
      <p><strong>Cancellation by Website/Application/Customer
      </strong></p>
      <p>You as a customer can cancel your order anytime up to the cut-off time of the slot for which you have placed an order by calling our customer service. In such a case we will refund any payments already made by you for the order into your wallet held with company. If we suspect any fraudulent transaction by any customer or any transaction which defies the terms & conditions of using the Website/Application, we at our sole discretion could cancel such orders. We will maintain a negative list of all fraudulent transactions and customers and would deny access to them or cancel any orders placed by them.
      </p>
      <p><strong>Quality Liability</strong></p>
      <p>Laddoo story is an online platform for ordering and delivery of products listed on the Website/Application and manufacturing of these products. We ensure they are quality certified and have a valid registration with the requisite authorities. The customer is solely responsible for the product she/he purchases and the effects of the consumption of these products are her/his responsibility including any expenses or costs that medical treatment or any other action may ensue.
      </p>

      <h2>You Agree and Confirm</h2>
      <ol>
        <li>
          <p>In the event that a non-delivery occurs on account of a mistake by you (i.e. wrong name or address or any other wrong information) any extra cost incurred by LADDOO STORY for redelivery shall be claimed from you.</p>
        </li>
        <li>
          <p>You will use the services provided by the Website/Application, its affiliates, consultants and contracted companies, for lawful purposes only and comply with all applicable laws and regulations while using and transacting on the Website/Application.</p>
        </li>
        <li>
          <p>You will provide authentic and true information in all instances where such information is requested of you. LADDOO STORY reserves the right to confirm and validate the information and other details provided by you at any point of time. If upon confirmation your details are found not to be true (wholly or partly), it has the right in its sole discretion to reject the registration and debar you from using the Services and / or other affiliated Website/Applications without prior intimation whatsoever.</p>
        </li>
        <li>
          <p>You are accessing the services available on this Website/Application and transacting at your sole risk and are using your best and prudent judgment before entering into any transaction through this Website/Application.</p>
        </li>
        <li>
          <p>The address at which delivery of the product ordered by you is to be made will be correct and proper in all respects.</p>
        </li>
        <li>
          <p>Before placing an order you will check the product description carefully. By placing an order for a product you agree to be bound by the conditions of sale included in the item’s description.</p>
        </li>
        <li>
          <p>We are not liable for any complaints reported after 24-48 hours.</p>
        </li>
      </ol>

      <p><strong>Modification of Terms & Conditions of Service:</strong> LADDOO STORY may at any time modify the Terms of Service of Use of the Website/Application without any prior notification to you. You can access the latest version of these Terms of Service at any given time on the Website/Application. You should regularly review the Terms of Service on the Website/Application. In the event the modified Terms of Service are not acceptable to you, you should discontinue using the Service. However, if you continue to use the Service, you shall be deemed to have agreed to accept and abide by the modified Terms of Service of Use of this Website/Applications.</p>


      {/* Add the rest of the content */}
    </div>

    {/* Footer component */}
    <Footer />

    </div>
  );
};

export default TermsOfService;
