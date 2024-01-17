"use client"
import { useState } from 'react';
import axios from 'axios';
import './OrderCompletion.css';

const OrderCompletion = () => {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const handleSearchOrder = async () => {
    try {
      // Check if orderId is entered before making the request
      if (!orderId) {
        console.log('Please enter an Order ID.');
        return;
      }

      // Make an Axios POST request to the searchOrder API
      const response = await axios.post('/api/orders/searchOrder', { orderId:orderId });

      // Check if the order is found
      if (response.data.order) {
        setProductDetails(response.data.order.productDetails);
        setOrderStatus(true);
      } else {
        setProductDetails(null);
        setOrderStatus(false);
      }

      console.log('Search Order Response:', response.data);
    } catch (error) {
      console.error('Error searching for order:', error.message);
    }
  };

  const handleCompleteTransaction = () => {
    // Implement logic to complete the transaction and update order status
    // For simplicity, let's just log the completion status for now
    console.log('Transaction completed for order:', orderId);
    setOrderStatus(true);
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
        <button type="button" className="button" onClick={handleCompleteTransaction}>
          Complete Transaction
        </button>
      </form>
      {orderStatus && (
        <div className="orderDetails">
          <h3>Order Details</h3>
          <ul>
            {productDetails &&
              productDetails.map((product, index) => (
                <li key={index}>
                  {`Product Name: ${product.productName}, Price: ${product.price}, Weight: ${product.weight}`}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderCompletion;
