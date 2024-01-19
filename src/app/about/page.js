import React from 'react';
import styles from './about.module.css';
import CustomNavbar from '../components/CustomNavbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div style={{marginTop:200}}>
      {/* Navbar */}
      <CustomNavbar />
    <div className={styles.container}>
      <h1 className={styles.h1}>Hello Laddoos lovers!</h1>
      <p className={styles.p}>Your most welcome in LADDOO STORY family. Our ‘Homemade’ box of Laddoos, carries a ‘token of love’ for you, your family & friends. Yes, it is indeed a ‘token of love’ because we at Simply Laddoos nurture our sweets with love combined with finest ingredients cooked in very hygienic conditions.</p>
      <p className={styles.p}>Every piece promises to deliver you satisfaction of the cost. These little gems will tickle your palate and leave you wanting for more. All our sweets are cooked in ‘Desi Ghee’ incorporating traditional methods of cooking.</p>
      <p className={styles.p}>Our Laddoos are free from additives, need no refrigeration, and have a long shelf life. ‘Laddu Story’ gives you trust in purity, combined with ‘Homemade’ taste. Hope you enjoy our sweets and remember us in your blessings.</p>
      <p className={styles.p}>We sell sugar or without sugar laddu on your order. YES! We mean that because that’s what you are buying in the form of sweet in every other sweet shop. Our Laddus are made with all-natural Jaggery and Ghee.</p>

      {/* ========================================================================== */}
 
      <div>
        <h1 className={styles.h1}>For a Person...</h1>
        <p className={styles.p}>It is a challenging feat to distance oneself from one&apos;s roots, culture, and the real flavors of pure laddu of one&apos;s home mother. Although we may physically move away from these elements, the nostalgia and memories remain, ultimately creating a craving for the familiar flavors of home.</p>
      </div>
      <div>
        <h1 className={styles.h1}>LADDOO STORY: A Bridge to Nostalgia</h1>
        <p className={styles.p}>In the bustling lifestyle of big cities today, LADDOO STORY acts as a bridge, reviving these memories, nostalgia, and flavors and bringing them closer to you. We are creating an ecosystem that takes care of both our health and taste equally.</p>
      </div>
      <div>
        <h1 className={styles.h1}>Laddostory: Traditional and Authentic Flavors</h1>
        <p className={styles.p}>The name Laddoostory originates from the combination of &quot;LADDOO + STORY,&quot; representing traditional, authentic, and unadulterated flavors without preservatives. Amidst the present busy and chaotic life, the instant availability of the flavors of our hometown creates a feeling of nostalgia and connection with our roots.</p>
      </div>
      <div>
        <h1 className={styles.h1}>We Believe in Eating Better</h1>
        <p className={styles.p}>There are many sweets available in the market, but they are making us sick, so homemade sweets will take care of you. We will take care of you.</p>
      </div>


    </div>

    {/* Footer */}
    <Footer />

    </div>
    
  );
};

export default About;
