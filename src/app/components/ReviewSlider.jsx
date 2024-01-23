import React, { useState, useEffect } from "react";
import { IoStar } from "react-icons/io5";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import styles from "./styles/ReviewSlider.module.css";
import { FaUserCircle } from "react-icons/fa";

const ReviewSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Review data================
  const reviews = [
    { rating: 4,username:"Anju Patel" ,comment: "Great product! Loved it." },
    { rating: 5,username:"Anshuman Mishra" ,comment: "Excellent service and quality." },
    { rating: 3,username:"Aakash Maurya" ,comment: "Excellent service and quality." },
    // Add more reviews as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // Adjust the interval as needed (in milliseconds)

    return () => clearInterval(interval);
  }, [reviews.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  return (
    <div className={styles.slider}>
      <div
        className={styles.slides}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentIndex ? styles.active : ""
            }`}
          >
            <div className={styles.contentContainer}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

              <div style={{border:"8px solid #1f1e1e",fontSize:25,fontWeight:"bolder",padding:16,paddingInline:18,backgroundColor: "white",borderRadius:90,margin:10}}>
              <FaUserCircle style={{fontSize:40,padding:0}} />
              </div>
              <h2>{review.username}</h2>
              </div>
              
              <h3 className={styles.comment}>{review.comment}</h3>
              <div className={styles.rating}>
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i} className={styles.star}>
                    <IoStar style={{fontSize:30}} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.navButtons}>
        <button
          className={`${styles.navButton} ${styles.prev}`}
          onClick={prevSlide}
        >
          <GrPrevious />
        </button>
        <button
          className={`${styles.navButton} ${styles.next}`}
          onClick={nextSlide}
        >
          <GrNext />
        </button>
      </div>
      <div className={styles.dots}>
        {reviews.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ReviewSlider;
