import React from 'react';
import Image from 'next/image';
import { IoStar } from 'react-icons/io5';
import { FaRegStar } from 'react-icons/fa';
import { calculateTotalAmount } from '@/library/util/calculateTotalAmount';
import styles from './styles/CartSubmodule.module.css';

const CartProductShowing = ({ item, productWeight, setProductWeights, dispatch }) => {
    return (
            // custom add style
            <div className={styles.productContainer} key={item._id}>
            <h3 className={styles.ProductName}>{item.productName}</h3>
      
            <div className={styles.productImagesContainer}>
              {item.images.map((ele, index) => {
                let url = `/ProductImages/${ele}.jpg`;
                return (
                  <Image
                    src={url}
                    width={180}
                    height={180}
                    className={styles.productImage}
                    alt="Product Images"
                    key={index}
                  />
                );
              })}
            </div>
      
            {item.category[item.categoryIndex] &&
            item.category[item.categoryIndex].price !== undefined ? (
              <h4 className={styles.productPrice}>
                <span>&#8377;</span>
                {item.category[item.categoryIndex].price} Rs/kg
              </h4>
            ) : null}
      
            <div className={styles.productRating}>
              {[...Array(5)].map((_, index) => (
                item.category[item.categoryIndex].rating > index ? (
                  <IoStar key={index} className="ms-1" />
                ) : (
                  <FaRegStar key={index} className="ms-1" />
                )
              ))}
            </div>
      
            {/* ... Remaining code ... */}
      
            <h3 className={`${styles.totalAmount} pt-2`}>
              Total Amount:
              <span>
                &#8377;
                <strike>{item.category[item.categoryIndex].price * productWeight}</strike>
                <span style={{ marginLeft: 10 }}>
                  &#8377;{(calculateTotalAmount(item, productWeight)).toFixed(2)} Rs.
                </span>
              </span>
            </h3>
      
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button
                className={`btn btn-primary ${styles.removeButton}`}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
                onClick={() =>
                  dispatch({
                    type: 'REMOVE_FROM_CART',
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
  };
  
  export default CartProductShowing;