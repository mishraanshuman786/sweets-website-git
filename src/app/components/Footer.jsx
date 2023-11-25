import { FaLocationPin } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./styles/Footer.css";
export default function Footer(){

     //  fetching products from database
  const [products, setProducts] = useState();
  useEffect(() => {
    getData();
  }, [products]);

  async function getData() {
    let data = await fetch("api/products");
    data = await data.json();
    await setProducts(data);
  }


    return (
        <div className="footer">
            {/* Personal Details */}
          <div className="personal-details" style={{width:"70%"}}>
            <h1><u>Personal Details</u></h1>
            <div className="address">
            <h1> <FaLocationPin style={{marginRight:6}} /> Address: </h1><br/>
            <p>
                S-28/56 R-9 Anula Mahadev Nagar Colony, Varanasi
            </p>

            </div>
            <div className="contact">
           <h1><FaPhone style={{marginRight:6}} /> Phone Number</h1>
            <p>6307010388</p>
            </div>
            <div className="fssai">
              <h1><FaGlobe style={{marginRight:6}} />FSSAI </h1>
              <p>22723630000206</p>
            </div>

          </div>

         
          {/* Products List */}
          <div className="product-list">
            <h1><u>Our Products</u></h1>
            <ul>
              {
                (products)?(
                  products.result.map((element)=>{
                    let url=`/products/${element._id}`;
                      return (
                        <li key={element._id}><Link className="link" href={url}>{element.productName}</Link></li>
                      )
                  })
                ):null
              }
             
             
            </ul>
          </div>
           
        </div>
    )
}