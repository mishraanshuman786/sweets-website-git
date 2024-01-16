"use client"
import {createContext, useContext, useState} from "react";

const PaymentContext=createContext();

export const PaymentProvider=({children})=>{
    const [paymentAddress, setPaymentAddress] = useState({});
    const [paymentAmount,setPaymentAmount]=useState(0);
    const updatePaymentAmount=(newPaymentAmount)=>{
        setPaymentAmount(newPaymentAmount);
    };

    const updatePaymentAddress=(newPaymentAddress)=>{
        setPaymentAddress(newPaymentAddress);

    }

    return (
        <PaymentContext.Provider value={{paymentAmount,updatePaymentAmount,paymentAddress,updatePaymentAddress}}>
            {children}
        </PaymentContext.Provider>
    )
};

export const usePayment=()=>{
    return useContext(PaymentContext);
}