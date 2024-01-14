"use client"
import {createContext, useContext, useState} from "react";

const PaymentContext=createContext();

export const PaymentProvider=({children})=>{
    const [paymentAmount,setPaymentAmount]=useState(0);
    const updatePaymentAmount=(newPaymentAmount)=>{
        setPaymentAmount(newPaymentAmount);
    };

    return (
        <PaymentContext.Provider value={{paymentAmount,updatePaymentAmount}}>
            {children}
        </PaymentContext.Provider>
    )
};

export const usePayment=()=>{
    return useContext(PaymentContext);
}