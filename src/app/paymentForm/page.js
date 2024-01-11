"use client"
import { useState } from 'react';
import styles from './PaymentForm.module.css';
import Navbar from '../components/Navbar';

const PaymentForm= () => {
  
  return (
    <div style={{marginTop:170,backgroundColor:"whitesmoke"}}>
      <Navbar/>
    <div className={styles.container}>
      <div className={styles.leftContainer}>
          <div className={styles.leftHeading}>
            <h2 style={{fontSize:24,padding:6}}>DELIVERY ADDRESS</h2>
          </div>
          <div className={styles.leftAddressList}>
             <div style={{display:"flex",paddingLeft:20,fontWeight:"bold",color:"black"}}>
              <div ><input type='radio' /></div>
              <div style={{marginLeft:16,marginRight:16}} >Anshuman Mishra</div>
              <div>7706087842</div>
             </div>
             <div style={{marginBottom:15,width:500,marginLeft:40,padding:20}}>
              lorem ipsum dolor sit amet, consectetur
             </div>
          </div>

          <div className={styles.formContainer}>
            <form>
              <div style={{marginLeft:100}}>
                <span style={{marginRight:40}} ><input type='text' placeholder='Name' className={styles.input} /></span>
                <span><input type='text' placeholder='10 Digit Mobile Number' className={styles.input} /></span>
              </div>
              <div style={{marginLeft:100}}>
                <span style={{marginRight:40}} ><input type='text' placeholder='Pincode' className={styles.input} /></span>
                <span><input type='text' placeholder='Locality' className={styles.input} /></span>
              </div>
              <div style={{marginLeft:100}}>
                <input type='email' placeholder='Email' className={styles.email} />
              </div>
              <div  style={{marginLeft:100}}>
                <textarea style={{paddingLeft:8,width:540,borderRadius:4}} placeholder='Address(Area and Street)' rows={4}>

                </textarea>
              </div>
              <div style={{marginLeft:100}}>
                <span style={{marginRight:40}} ><input type='text' placeholder='City/District/Town' className={styles.input} /></span>
               
              </div>
              <div style={{marginLeft:100}}>
                <span style={{marginRight:40}} ><input type='text' placeholder='Landmark' className={styles.input} /></span>
                <span><input type='text' placeholder='Alternate Phone' className={styles.input} /></span>
              </div>
            </form>

          </div>
      </div>
      <div className={styles.rightContainer}>
      <div className={styles.leftHeading}>
            <h2 style={{fontSize:24,padding:6}}>PRICE DETAILS</h2>
      </div>
      <div style={{padding:15,display:"flex",justifyContent:'space-between'}}>
        <label style={{fontSize:25}}>Price:</label><span style={{fontSize:25}}>12000</span>
      </div>
      <div style={{padding:15,display:"flex",justifyContent:'space-between'}}>
        <label style={{fontSize:25}}>Delivery Charges:</label><span style={{fontSize:25}}>49</span>
      </div>
      <div style={{padding:15,display:"flex",justifyContent:'space-between'}}>
        <label style={{fontSize:25}}>Packaging Charges:</label><span style={{fontSize:25}}>20</span>
      </div>
      <div style={{borderTop:"2px dashed grey"}}></div>
      <div style={{padding:15,display:"flex",justifyContent:'space-between'}}>
        <label style={{fontSize:25,fontWeight:"bold"}}>Total Payable:</label><span style={{fontSize:25}}>20</span>
      </div>
      <hr/>
       <button className={styles.button}>Cash On Delivery</button>
      </div>
      
    </div>
    </div>
  );
};

export default PaymentForm;
