"use client";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./Category.css";
import Footer from "@/app/components/Footer";
import { CartState } from "@/context/Context";
import { useRouter } from "next/navigation";
import { FaRegStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";

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
    path = `/collectionsImages/${content.category[0].image}.jpg`;

    // to update the id to index number of the category price and rating
    temp = content.product[0].category.findIndex((ele) => {
      return ele.id === params.products;
    });
  }

  return (
    <div>
      {/* navbar */}
      <Navbar />
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
            <h4>{content.category[0].name}</h4>
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
              {content.category[0].desc}
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
                {content.category[0].name}
              </h2>
              <h4>{content.category[0].number} Products</h4>
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
            {content.product.map((element) => {
              let path = `/ProductImages/${element.images[0]}.jpg`;
              return (
                <div
                  key={element._id}
                  className="d-lg-flex justify-content-between"
                  style={{ border: "1px solid grey" }}
                >
                  <div className="d-flex  w-100">
                    <div style={{ padding: 10 }}>
                      <Image
                        src={path}
                        style={{ borderRadius: 6, border: "1px solid black" }}
                        width="200"
                        height="210"
                        alt="Product Image"
                      />
                    </div>
                    <div style={{ padding: 10, color: "brown" }}>
                      <h3>{element.productName}</h3>

                      <h4>Price: {element.category[temp].price} Rs/Kg</h4>
                      <div>
                        {[...Array(5)].map((_, index) => {
                          return element.category[temp].rating > index ? (
                            <IoStar />
                          ) : (
                            <FaRegStar />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {cart.some((p) => p._id === element._id) ? (
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
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: { id: element._id },
                          })
                        }
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
                        onClick={() =>
                          dispatch({ type: "ADD_TO_CART", payload: element })
                        }
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
}
