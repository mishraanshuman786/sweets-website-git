"use client";
import "./Cart.css";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import Footer from "@/app/components/Footer";
import { CartState } from "@/context/Context";
import RazorpayForm from "../components/RazorpayForm";

export default function Cart() {
  const [totalAmount, setTotalAmount] = useState(0);
  // Define a state for product weights
  const [productWeights, setProductWeights] = useState({});

  // cart data
  let {
    state: { cart, idPrice },
    dispatch,
  } = CartState();

  // filter data
  const {
    filterState: { sort, byRating, searchQuery },
    filterDispatch,
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = [...cart];

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) => {
        if (sort === "lowToHigh") {
          return a.category[idPrice].price - b.category[idPrice].price;
        } else if (sort === "highToLow") {
          return b.category[idPrice].price - a.category[idPrice].price;
        } else {
          return sortedProducts;
        }
      });
    }
    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.category[idPrice].rating >= byRating;
      });
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.productName.toLowerCase().includes(searchQuery);
      });
    }

    return sortedProducts;
  };

  useEffect(() => {
    let calculatedTotalAmount = 1;

    // if (cart.length >= 1) {
    //   cart.forEach((item) => {
    //     calculatedTotalAmount += item.category[idPrice].price;
    //   });
    // }

    setTotalAmount(calculatedTotalAmount);
  }, [cart, idPrice]);

  return (
    <div style={{ marginTop: 170 }}>
      {/* navbar */}
      <Navbar />

      {/* filter content */}
      <div className="row m-3 m-sm-5">
        {/* Filters Component */}
        <div
          className="col-lg-3 mb-4 col-12"
          style={{
            border: "1px solid grey",
            borderRadius: 6,
            backgroundColor: "#1A2421",
          }}
        >
          <h5 className="mt-5 ms-2" style={{ color: "white" }}>
            Sort By Price
          </h5>

          {/* ascending and descending order */}
          <div>
            <div className="form-check">
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="customRadio1"
                  name="customRadio"
                  style={{ fontSize: "20" }}
                  className="custom-control-input "
                  checked={sort === "lowToHigh" ? true : false}
                  onChange={() =>
                    filterDispatch({
                      type: "SORT_BY_PRICE",
                      payload: "lowToHigh",
                    })
                  }
                />
                <label className="text-light" for="customRadio1">
                  <h5>Ascending Order</h5>
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="customRadio2"
                  name="customRadio"
                  style={{ fontSize: "20" }}
                  className="custom-control-input"
                  checked={sort === "highToLow" ? true : false}
                  onChange={() =>
                    filterDispatch({
                      type: "SORT_BY_PRICE",
                      payload: "highToLow",
                    })
                  }
                />
                <label className="text-light" for="customRadio2">
                  <h5>Descending Order</h5>
                </label>
              </div>
            </div>
          </div>
          {/* rating component */}
          <div className="mb-4" style={{ color: "white" }}>
            <h5 className="text-light mt-4">Sort By Rating:</h5>

            {[...Array(5)].map((_, index) => {
              return (
                <span
                  key={index}
                  onClick={() =>
                    filterDispatch({
                      type: "FILTER_BY_RATING",
                      payload: index + 1,
                    })
                  }
                  style={{ color: "white" }}
                >
                  {" "}
                  {byRating > index ? <IoStar /> : <FaRegStar />}{" "}
                </span>
              );
            })}
          </div>

          {/* serach by entering the product name */}
          <div className="input-group mb-3 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product Name"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) =>
                filterDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                })
              }
            />
          </div>

          {/* clear filters button */}
          <button
            type="button"
            className="btn btn-success  mt-5 w-100 mb-5"
            onClick={() => filterDispatch({ type: "CLEAR_FILTERS" })}
          >
            Clear Filters
          </button>

          {/* Make Payment Button */}
          {cart.length >= 1 ? (
            <div>
              <h4 className="text-light">Total Amount:{totalAmount}</h4>

              <RazorpayForm amount={totalAmount} />
            </div>
          ) : null}
        </div>

        <div
          className="container col-lg-8 col-12"
          style={{
            border: "1px solid grey",
            borderRadius: 6,
            backgroundColor: "whitesmoke",
          }}
        >
          {cart.length >= 1 ? (
            transformProducts().map((item) => {
              // Use the product's ID as a key for the product's weight
              const productWeight = productWeights[item._id] || 1;

              return (
                <div
                  style={{
                    border: "1px solid grey",
                    backgroundColor: "white",
                    margin: 8,
                    borderRadius: 6,
                    padding: 6,
                  }}
                  key={item._id}
                >
                  <h3 style={{ color: "brown" }}>{item.productName}</h3>
                  <div style={{ display: "flex", overflowX: "auto" }}>
                    {item.images.map((ele, index) => {
                      let url = `/ProductImages/${ele}.jpg`;
                      console.log(item.categoryId);
                      return (
                        <Image
                          src={url}
                          width={180}
                          height={180}
                          style={{
                            border: "1px solid grey",
                            borderRadius: 6,
                            margin: 6,
                          }}
                          alt="Product Images"
                          key={index}
                        />
                      );
                    })}
                  </div>

                 
                    {item.category[item.categoryIndex] &&
                    item.category[item.categoryIndex].price !== undefined ? (
                      <h4>
                      <strike className="me-2">
                        {item.category[item.categoryIndex].price + 100}Rs/kg
                      </strike>
                       {item.category[item.categoryIndex].price} Rs/kg
                       </h4>
                    ) : null}
                   
                  <div>
                    {[...Array(5)].map((_, index) => {
                      return item.category[item.categoryIndex].rating > index ? (
                        <IoStar className="ms-1" />
                      ) : (
                        <FaRegStar className="ms-1" />
                      );
                    })}
                  </div>

                  {/* weight calculator controls */}
                  <div
                    style={{
                      width: 160,
                      padding: 0,
                      height: 40,
                      border: "1px solid black",
                      fontSize: 25,
                      fontWeight: "bold",
                      borderRadius: 6,
                      userSelect: "none",
                      marginTop: 6,
                    }}
                  >
                    <div
                      style={{
                        height: 38,
                        display: "inline-block",
                        width: 29,
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        // Update the product's weight for the specific item
                        setProductWeights((prevWeights) => ({
                          ...prevWeights,
                          [item._id]: productWeight > 1 ? productWeight - 1 : 1,
                        }));
                      }}
                    >
                      -
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        width: 98,
                        textAlign: "center",
                      }}
                    >
                      {productWeight}kg
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        height: 38,
                        width: 29,
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setProductWeights((prevWeights) => ({
                          ...prevWeights,
                          [item._id]:
                            productWeight < 50 ? productWeight + 1 : 50,
                        }))
                      }
                    >
                      +
                    </div>
                  </div>

                  {/* Total Amount */}
                  <h3 className="pt-2">
                    Total Amount:
                    <span>{item.category[idPrice].price * productWeight}Rs.</span>
                  </h3>

                  {/* buttons */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <button
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      style={{
                        width: 145,
                        height: 44,
                        borderRadius: 6,
                        fontSize: 14,
                        color: "white",
                        margin: 15,
                        marginTop: 8,
                        border: "none",
                        backgroundColor: "brown",
                      }}
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: {
                            productId: item._id,
                          },
                        })
                      }
                    >
                      Remove To Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-cart-container">
              <h2>Your Cart is Empty. Please Add Some Products..... </h2>
              <div>
              <img src="/emptycart.webp" alt="empty cart" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}
