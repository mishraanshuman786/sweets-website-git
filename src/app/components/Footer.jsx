"use client";
import Link from "next/link";
import "./styles/footer.css";
import { FaInstagramSquare } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
export default function Footer() {
  return (
    <div  style={{backgroundColor:"brown",color:"white"}}>
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
              We source these authentic desi flavours and regional savours
              from the best regional vendors who are known for generations for
              these amazing delicacies. The name SweeDesi is comes from “Sweets
              + Desi” i.e. the Sweets and flavours which are Traditional,
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
              About Us Shipping Policy Return & Refund Policy Terms of Service
              Contact Us Privacy Policy
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
            <div class="accordion-body" style={{ color: "white" }}>
              <pre>
                Customer Care - 7272848989 ( Mon-Sat : 9 AM to 7 PM )<br></br>
                Email : support@sweedesi.com<br></br>
                Address: D6/284, Chitrakoot, Jaipur, Rajasthan - 302021
              </pre>
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
            amazing delicacies. The name SweeDesi is comes from “Sweets + Desi”
            i.e. the Sweets and flavours which are Traditional, Authentic,
            Unadulterated with no preservatives. In the current busy and hectic
            life, the ready availability of our hometown flavours gives us a
            nostalgic feeling and closeness to our roots.
          </p>
        </div>
        <hr/>
        <div>
          <h5>Quicklinks</h5>
          <ul style={{ display: "flex",listStyleType:"none",justifyContent:"flex-start" }}>
            <li style={{marginRight:"5%"}}>About Us</li>
            <li style={{marginRight:"5%"}}>Shiping Policy</li>
            <li style={{marginRight:"5%"}}>Return and Refund Policy</li>
            <li style={{marginRight:"5%"}}>Terms of Service</li>
            <li style={{marginRight:"5%"}}>Contact Us</li>
            <li style={{marginRight:"5%"}}>Privacy Policy</li>
          </ul>
        </div>
        <hr/>
        <div>
          <h5>Get In Touch With Us</h5>
          <p>
            Customer Care - 7272848989 ( Mon-Sat : 9 AM to 7 PM ) <br></br>
            Email :
            support@sweedesi.com <br></br> 
            Address: D6/284, Chitrakoot, Jaipur, Rajasthan
            - 302021
          </p>
        </div>

      </div>
      
{/* addition footer part */}
      <div className="container-fluid" style={{backgroundColor:"brown",color:"white"}}>
      <hr></hr>
       <div className="d-md-flex justify-content-between">
       
       <div>
        <h6>@2023 Ladoo Story</h6>
        <h6>All Rights Reserverd</h6>
       </div>

       <div>
        <h6>Follow Us</h6>
        <div>
        <Link href={"https://www.instagram.com/"} ><FaInstagramSquare style={{width:40,height:60,color:"white"}} /></Link>
        <Link href={"https://www.facebook.com/"} > <ImFacebook2  style={{width:40,height:60,color:"white"}}/></Link>
       
        </div>
       </div>
       </div>
      </div>



    </div>
  );
}
