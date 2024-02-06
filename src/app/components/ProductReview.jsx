"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/ProductReviews.module.css"; // Import your CSS module for styling

const ProductReviews = (props) => {
 

  const initialReviews = props.products.result[0].additional;

  const [reviews, setReviews] = useState(initialReviews);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const fadeRef = useRef(null);

  const handleRatingChange = (event) => {
    setNewRating(parseInt(event.target.value, 10));
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddReview =async () => {
    // Add new review to the state
    const newReview = {
      productRating: newRating,
      productComment: newComment,
    };
    setReviews([...reviews, newReview]);
   
   const apiUrl = `/api/products/${props.productId}`;
    // sending fetch post request to the products/[id] route
    let response=await fetch(apiUrl,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(newReview),
    });

    response=await response.json();

   

    // Clear the input fields
    setNewRating(5);
    setNewComment("");   

    // Trigger animation
    setIsAnimating(true);
  };

  useEffect(() => {
    // Reset animation state after animation duration
    const animationDuration = 1000; // Set your desired animation duration in milliseconds
    const timerId = setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);

    return () => clearTimeout(timerId);
  }, [isAnimating]);

  
 
  return (
    <div className={styles.productReviewsContainer}>
      {/* Display existing reviews */}
      <div className={styles.reviewsSection}>
        <h2>Customer Reviews:</h2>
        {(reviews)?(reviews.slice(-2).map((review,id) =>{ return (
          <div key={review.id} className={styles.reviewItem}>
            <div>
              {Array.from({ length: review.productRating }).map(
                (_, index) =>{return (
                  <span key={index} role="img" aria-label="star">
                    ⭐
                  </span>
                )}
              )}
            </div>
            <p>{review.productComment}</p>
          </div>
        )})):null
        
        }
      </div>

      {/* Write Review Section */}
      <div className={styles.writeReviewSection}>
        <h2>Write a Review:</h2>
        <div>
          <label htmlFor="rating">Rating:</label>
          <select id="rating" value={newRating} onChange={handleRatingChange}>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={newComment}
            onChange={handleCommentChange}
          ></textarea>
        </div>
        <button onClick={handleAddReview}>Submit Review</button>
      </div>

      {/* Fade-in animation */}
      {isAnimating && (
        <div ref={fadeRef} className={styles.fadeInAnimation}>
          New review added!
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
