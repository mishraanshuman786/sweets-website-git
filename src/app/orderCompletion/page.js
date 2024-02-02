"use client"
import { useState } from 'react';
import axios from 'axios';
import './OrderCompletion.css';
import { toast } from "react-toastify";

const OrderCompletion = () => {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(false);
  const [details, setDetails] = useState(null);

  const handleSearchOrder = async () => {
    try {
      // Check if orderId is entered before making the request
      if (!orderId) {
       
        return;
      }

      // Make an Axios POST request to the searchOrder API
      const response = await axios.post('/api/orders/searchOrder', { orderId:orderId });

      // Check if the order is found
      if (response.data) {
        setDetails(response.data.order);
       
        setOrderStatus(!response.data.order.orderCompleted);
      } else {
        setDetails(null);
        setOrderStatus(false);
      }

     
    } catch (error) {
      console.error('Error searching for order:', error.message);
    }
  };

  const handleCompleteTransaction =async () => {
    try {
      // Check if orderId is entered before making the request
      if (!orderId) {
       
        return;
      }

      // Make an Axios POST request to the searchOrder API
      const response = await axios.post('/api/orders/completeOrder', { orderId:orderId });

      // Check if the order is found
      if (response.data) {
        toast.success("Order Delivered Successfully. Thank you.....", { position: "top-right" });
        setOrderStatus(!response.data.order.orderCompleted);
      } else {
        toast.error("There is some problem in completing the order.", { position: "top-right" });
        setDetails(null);
      }

     
    } catch (error) {
      console.error('Error searching for order:', error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Order Completion</h1>
      <form className="form">
        <label htmlFor="orderId">Order ID:</label>
        <input
          type="text"
          className="input"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button
          type="button"
          className="button"
          onClick={handleSearchOrder}
          disabled={!orderId}  // Disable the button if orderId is not entered
        >
          Search Order
        </button>
        <button
          type="button"
          className="button"
          onClick={handleCompleteTransaction}
          disabled={!orderStatus}  // Disable the button if orderStatus is false
        >
          Complete Transaction
        </button>
      </form>
      {(
        <div className="orderDetails">
          <h3>Order Details</h3>
          
            {details ? (
              <ul>
              <li>
                {`User Id: ${details.userId}`} 
              </li>
              <li>{` Order Id: ${details.orderId}`}</li>
              <li>{`Name: ${details.name}`}</li>
              <li>{`Amount: ${details.amount}`}</li>
              <li>{`Address: ${details.address}`}</li>
              </ul>
            ) : <ul> <li>
                  <h4>No Details Found with this Order Id.</h4>
          </li></ul>}
          
        </div>
      )}
    </div>
  );
};

export default OrderCompletion;
