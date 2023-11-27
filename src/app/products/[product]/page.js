"use client";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaLocationPin } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";

export default function Product({ params }) {
  // state to store particular product data
  const [product, setProduct] = useState();
  let path;

  useEffect(() => {

    getProduct();
  
  }, []);

  async function getProduct() {
    let url = `/api/products/${params.product}`;
    let data = await fetch(url);
    data = await data.json();
    await setProduct(data);
    
  }

  
  return (
    <div>
      {/* // Navbar */}
      <Navbar />
      <div className="container-fluid">
        <div className="container-fluid bg-dark">
          <h1 className="h1 text-light p-2">Products</h1>
        </div>
        <div
          className="container m-5 mx-auto"
          style={{ backgroundColor: "whitesmoke", border: "2px solid black",borderRadius:10 }}
        >

          {product ? (product.result.map((element)=>{
            
            path=`/ProductImages/${element.images[0]}.jpg`;
            console.log("image path:",path);
           return (
            <div className="container-fluid row">
                {/* // image figcaption */}
            <figure className="figure col-3" >
            <Image src={path} width={500} height={200} className="mt-4 figure-img img-fluid rounded" alt="Hello" style={{border:"2px solid grey"}} />
            <figcaption className="figure-caption">
             <h4 className="text-dark">Product Name: {element.productName}</h4> 
              <h5>Category: {element.category}</h5>
            </figcaption>
          </figure>
            
            <div className="col-8 m-4" style={{border:"1px solid grey",borderRadius:10,backgroundColor:"wheat"}}>
              <p className="h3 mt-5  ytext-center container-fluid">{element.desc}</p>


              </div>

          
          
           </div>
            )
          })) : null}
        </div>
      </div>

      {/* ========================================================= */}
      {/* Footer Part */}
     <div className="Footer">
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
        </div>

     </div>
    </div>

  );
}
