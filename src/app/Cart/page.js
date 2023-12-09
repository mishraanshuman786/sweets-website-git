"use client";
import "./Cart.css";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import Footer from "@/app/components/Footer";
import { CartState } from "@/context/Context";

export default function Cart() {
  // cart data
  const {
    state: { cart },
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
          return a.price - b.price;
        } else if (sort === "highToLow") {
          return b.price - a.price;
        } else {
          return sortedProducts;
        }
      });
    }
    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.rating >= byRating;
      });
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.productName.toLowerCase().includes(searchQuery);
      });
    }

    return sortedProducts;
  };

  return (
    <div>
      {/* navbar */}
      <Navbar />

      <h2>Cart Component</h2>
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
            className="btn btn-outline-primary  mt-5 w-100 mb-5"
            onClick={() => filterDispatch({ type: "CLEAR_FILTERS" })}
          >
            Clear Filters
          </button>
        </div>

        <div
          className="container col-lg-8 col-12"
          style={{
            border: "1px solid grey",
            borderRadius: 6,
            backgroundColor: "white",
          }}
        >
          {cart.length >= 1 ? (
            transformProducts().map((item) => {
              return (
                <div
                  style={{
                    border: "1px solid grey",
                    backgroundColor: "whitesmoke",
                    margin: 8,
                    borderRadius: 6,
                    padding: 6,
                  }}
                  key={item._id}
                >
                  <h3 style={{ color: "brown" }}>{item.productName}</h3>
                  {item.images.map((ele,index) => {
                    let url = `/ProductImages/${ele}.jpg`;
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

                  <h4>{item.price} Rs/kg</h4>
                  <div>
                        {[...Array(5)].map((_,index) => {
                          return (item.rating > index) ? <IoStar className="ms-1" /> : <FaRegStar className="ms-1" />;
                        })}
                  </div>
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
                          border: "none",
                          backgroundColor: "brown",
                        }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: { id: item._id },
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
            <h2>Your Cart is Empty. Please Add Some Products..... </h2>
          )}
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}
