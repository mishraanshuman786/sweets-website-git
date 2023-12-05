"use client";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/app/components/Footer";
export default function Products({ params }) {
  useEffect(() => {
    getData();
  }, []);

  const [content, setContent] = useState();

  async function getData() {
    let url = `/api/collections/${params.products}`;
    let data = await fetch(url);
    data = await data.json();
    await setContent(data);
  }

  console.log("Content:", content);

  return (
    <div>

      {/* navbar */}
      <Navbar />
      <div className="row m-3 m-sm-5">
      <div className="col-sm-3 mb-4 col-12" style={{border:"1px solid grey",borderRadius:6,backgroundColor:"whitesmoke"}}>
        <h3 style={{color:"brown"}}>Filters</h3>

      </div>
      {content ? (
        <div className="container col-sm-8 col-12" style={{border:"1px solid grey",borderRadius:6,backgroundColor:"whitesmoke"}}>
          <div style={{ padding: 10 }}>
            <h2 style={{ color: "brown", marginTop: 10 }}>
              {content.category[0].name}
            </h2>
            <h4>{content.category[0].number} Products</h4>
            <h5 style={{ textAlign: "justify" }}>{content.category[0].desc}</h5>
          </div>
          {content.product.map((element) => {
            let path = `/ProductImages/${element.images[0]}.jpg`;
            return (
              <div className="d-lg-flex justify-content-between" style={{ border:'1px solid grey' }}>
                
                <div className="d-flex  w-100" >
                  <div style={{ padding: 10 }}>
                    <Image
                      src={path}
                      style={{ borderRadius: 6, border: "1px solid black" }}
                      width="200"
                      height="210"
                    />
                  </div>
                  <div style={{ padding: 10, color:"brown" }}>
                    <h3>{element.productName}</h3>
                    <h4>Price: 100$</h4>
                  </div>
                </div>
               
                  <button
                    style={{
                      width: 150,
                      height: 44,
                      borderRadius: 6,
                      fontSize: 18,
                      color: "white",
                      margin: 15,
                      border: "none",
                      backgroundColor: "brown",
                    }}
                  >
                    Add To Cart
                  </button>
               
              </div>
            );
          })}
        </div>
      ) : null}
     
      </div>
       {/* footer */}
       <Footer/>
    </div>
  );
}
