import { FaLocationPin } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
// import "./styles/Footer.css";
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
        <div className="container-fluid row bg-dark">
            {/* Personal Details */}
          <div className="col-12 col-xxl-7 ms-xxl-5 mt-xxl-3 ps-xxl-5 pt-5">
            <h1 className="text-light"><u>Personal Details</u></h1>
            <div className="mt-4">
            <h1 className="text-light"> <FaLocationPin style={{marginRight:6}} /> Address: </h1><br/>
            <p className="text-light h3">
                S-28/56 R-9 Anula Mahadev Nagar Colony, Varanasi
            </p>

            </div>
            <div className="contact mt-4">
           <h1 className="text-light"><FaPhone style={{marginRight:6}} /> Phone Number</h1>
            <p className="text-light h3">6307010388</p>
            </div>
            <div className="fssai mt-4">
              <h1 className="text-light"><FaGlobe style={{marginRight:6}} />FSSAI </h1>
              <p className="text-light h3">22723630000206</p>
            </div>

          </div>

         
          {/* Products List */}
          <div className="col-12 col-xxl-4 text-center py-5 pt-2">
            <h1 className="text-light"><u>Our Products</u></h1>
            <ul className="list-group list-group-flush" style={{listStyleType:"none"}}>
              {
                (products)?(
                  products.result.map((element)=>{
                    let url=`/products/${element._id}`;
                      return (
                        <li key={element._id}><Link  className="text-light list-group-item list-group-item-action list-group-item-success text-dark h3" href={url}>{element.productName}</Link></li>
                      )
                  })
                ):null
              }
             
             
            </ul>
          </div>
           
        </div>
    )
}