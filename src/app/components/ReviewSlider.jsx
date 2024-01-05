import React, { useState, useEffect } from 'react';
import { IoStar } from 'react-icons/io5';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import styles from './styles/ReviewSlider.module.css';

const ReviewSlider = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slides} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
          >
            <div className={styles.contentContainer}>
              <p className={styles.comment}>{review.comment}</p>
              <div className={styles.rating}>
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i} className={styles.star}>
                    <IoStar />
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.navButtons}>
        <button className={`${styles.navButton} ${styles.prev}`} onClick={prevSlide}>
        <GrPrevious />
        </button>
        <button  className={`${styles.navButton} ${styles.next}`} onClick={nextSlide}>
        <GrNext />
        </button>
      </div>
      <div className={styles.dots}>
        {reviews.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ReviewSlider;
