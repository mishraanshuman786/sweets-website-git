"use client"
import React from 'react';
import styles from './styles/HomePageDescription.module.css';

const HomePageDescription = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Ladoo Story- Flavours of India</h2>

      <p className={styles.paragraph}>
        Hello laddoos lovers, Your most welcome in LADDOO STORY family, Our
        ‘Homemade’ box of Laddoos, carries a ‘token of love’ for you, your
        family & friends. Yes, it is indeed a ‘token of love’ because we at
        Simply Laddoos nurture our sweets with love combined with finest
        ingredients cooked in very hygienic conditions. Every piece promises to
        deliver you satisfaction of the cost. These little gems will tickle your
        palate and leave you wanting for more. All our sweets are cooked in
        ‘Desi Ghee’ incorporating traditional methods of cooking. Our Laddoos
        are free from additives, needs no refrigeration and have long shelf
        life. ‘Laddu Story’ gives you a trust of purity, combined with
        ‘Homemade’ taste. Hope you enjoy our sweets and remember us in your
        blessings. We are sell sugar or without sugar laddu on your order YES!
        We mean that, because that’s what you are buying in the form of sweet in
        every other sweet shop. Our Laddus are made with all-natural Jaggery
        and Ghee.
      </p>

      <div className={styles.buttonContainer}>
        <h5>FSSAI License- 122222999000322</h5>
        <button
          onClick={() => window.open('https://wa.me/917706087842')}
          className={styles.button}
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default HomePageDescription;
