"use client";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
export default function Product() {
  useEffect(() => {
    getData();
  }, []);

  const [navProducts, setNavProducts] = useState();

  async function getData() {
    let data = await fetch("api/products");
    data = await data.json();
    await setNavProducts(data);
  }

  return (
    <div>
        {/* Navbar */}
      <Navbar />
       
       {/* heading */}
      <div className="bg-dark container-fluid sticky-top  mt-2 p-2 ">
          <h1 className="text-light mt-4">All Products</h1>
        </div>
      <div className="products">
        {/* start */}
        {navProducts
          ? navProducts.result.map((element) => {
                let path;

              return (
                <div key={element._id} className="card mt-5 container bg-dark" >
                    <div className="card-img-top m-2" style={{width:"100%",display:"flex",overflow:"auto"}}>
                        {
                            element.images.map((image,index)=>{
                                path = `/ProductImages/${image}.jpg`;
                                return (
                                 
                                  <Image key={index} src={path} width={100} style={{border:"2px solid white",width:150}}
                                  height={150} className="card-img-top m-4" alt="1" />
                                )
                              
                            })
                        }
                   
                    
                    </div>
                  
                  <div className="card-body">
                    <h5 className="card-title text-light text-lg h1">{element.productName}</h5>
                    <p className="card-text text-light h4">
                      {element.desc}
                    </p>
                    <br/>
                    <p className="card-text text-light">
                      <small className="text-body-secondary text-light">
                        {element.category}
                      </small>
                    </p>
                  </div>
                </div>
              );
            })
          : null}

        {/* end */}
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
