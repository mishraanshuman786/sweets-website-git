"use client";
import CustomNavbar from "@/app/components/CustomNavbar";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./Category.css";
import Footer from "@/app/components/Footer";
import { CartState } from "@/context/Context";
import { useRouter } from "next/navigation";
import { FaRegStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import Link from "next/link";

export default function Products({ params }) {
  useEffect(() => {
    getData();
  });

  const router = useRouter();
  const [content, setContent] = useState();

  let path, temp;

  async function getData() {
    let url = `/api/collections/${params.products}`;
    let data = await fetch(url);
    data = await data.json();
    await setContent(data);
  }

  // cart data
  let {
    state: { cart, idPrice },
    dispatch,
  } = CartState();

  if (content) {
    console.log("content:",content);
    path = `/collectionsImages/${content.category.image}.jpg`;

    // // to update the id to index number of the category price and rating
    // temp = content.product[0].category.findIndex((ele) => {
    //   return ele.id === params.products;
    // });
  }

  return (
    <div style={{marginTop:200}}>
      {/* navbar */}
      <CustomNavbar />
      <div className="row m-3 m-sm-5">
        {content ? (
          <div
            className="col-lg-4 mb-4 col-12"
            style={{
              border: "1px solid grey",
              borderRadius: 6,
              color: "brown",
              padding: 20,
            }}
          >
            <h4>{content.category.name}</h4>
            <Image
              src={path}
              width={300}
              height={200}
              className="leftimage"
              style={{ borderRadius: 6, border: "1px solid grey" }}
              alt="Category Image"
            />
            <h5
              className="mt-3"
              style={{ textAlign: "justify", color: "black" }}
            >
              {content.category.desc}
            </h5>
          </div>
        ) : (
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        )}

        {content ? (
          <div
            className="container col-lg-7 col-12"
            style={{
              border: "1px solid grey",
              borderRadius: 6,
              backgroundColor: "whitesmoke",
              padding: 20,
            }}
          >
            <div style={{ padding: 10 }}>
              <h2 style={{ color: "brown", marginTop: 10 }}>
                {content.category.name}
              </h2>
              
              <button
                style={{
                  width: 145,
                  height: 44,
                  borderRadius: 6,
                  fontSize: 14,
                  color: "white",
                  margin: 15,
                  border: "none",
                  backgroundColor: "brown",
                }}
                onClick={() => {
                  dispatch({ type: 'UPDATE_ID', payload:temp});
                  router.push("/Cart");
                }}
              >
                Go To Cart
              </button>
            </div>
            {content.result.map((element) => {
              let path = `/ProductImages/${element.images[0]}.jpg`;
              let link=`/products/${element._id}`;
              return (
                
                <div
                  key={element._id}
                  className="d-lg-flex justify-content-between"
                  style={{ border: "1px solid grey" }}
                >
                  <div className="d-flex text-dark  w-100 text-content-column">
                  <Link href={link} key={element._id} style={{textDecoration:'none'}}>
                    <div style={{ padding: 10 }}>
                      <Image
                        src={path}
                        style={{ borderRadius: 6, border: "1px solid black" }}
                        width="200"
                        height="210"
                        alt="Product Image"
                      />
                    </div>
                    </Link>
                    <div style={{ padding: 10, color: "brown" }}>
                      <h3>{element.productName}</h3>

                      <h4>Price: <span>&#8377;</span>{element.category[element.categoryIndex].price} Rs/Kg</h4>
                      <div>
                        {[...Array(5)].map((_, index) => {
                          return element.category[element.categoryIndex].rating > index ? (
                            <IoStar />
                          ) : (
                            <FaRegStar />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                  {cart.some(
                          (p) =>
                            p._id === element._id &&
                            p.categoryId === element.categoryId
                        ) ? (
                          <button
                            style={{
                              width: 145,
                              height: 44,
                              borderRadius: 6,
                              fontSize: 14,
                              color: "white",
                              margin: 15,
                              border: "none",
                              backgroundColor: "brown",
                            }}
                            onClick={() => {
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: {
                                  productId: element._id,
                                },
                              });
                            }}
                          >
                            Remove To Cart
                          </button>
                        ) : (
                          <button
                            style={{
                              width: 145,
                              height: 44,
                              borderRadius: 6,
                              fontSize: 14,
                              color: "white",
                              margin: 15,
                              border: "none",
                              backgroundColor: "brown",
                            }}
                            onClick={() => {
                              dispatch({
                                type: "ADD_TO_CART",
                                payload: element,
                              });
                            }}
                          >
                            Add To Cart
                          </button>
                        )}
                  </div>
                </div>
               
              );
            })}
          </div>
        ) :<div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>}
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
}
