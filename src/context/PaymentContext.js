"use client"
import {createContext, useContext, useState} from "react";

const PaymentContext=createContext();

export const PaymentProvider=({children})=>{
    const [paymentAddress, setPaymentAddress] = useState({});
    const [paymentAmount,setPaymentAmount]=useState(0);
    const [productDetails, setProductDetails] = useState([]);
   
    const updatePaymentAmount=(newPaymentAmount)=>{
        setPaymentAmount(newPaymentAmount);
    };

    const updatePaymentAddress=(newPaymentAddress)=>{
        setPaymentAddress(newPaymentAddress);

    }
    const addProductDetails = (newProductDetails) => {
        setProductDetails(newProductDetails);
      };

    return (
        <PaymentContext.Provider value={{paymentAmount,updatePaymentAmount,paymentAddress,updatePaymentAddress,productDetails,addProductDetails}}>
            {children}
        </PaymentContext.Provider>
    )
};

export const usePayment=()=>{
    return useContext(PaymentContext);
}