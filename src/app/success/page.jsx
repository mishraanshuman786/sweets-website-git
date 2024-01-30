"use client"
import React,{useEffect,useState} from "react";
import { useRouter } from "next/navigation";

const Success = () => {
 
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentAddress,setPaymentAddress]=useState();
  const [productDetails,setProductDetails]=useState();

  useEffect(()=>{
     // Retrieve payment details from session storage
     const storedPaymentAmount = sessionStorage.getItem("paymentAmount");
     const storedPaymentAddress = sessionStorage.getItem("paymentAddress");
     const storedProductDetails=sessionStorage.getItem("productDetails");
     if (storedPaymentAmount && storedProductDetails && storedPaymentAddress) {
      setPaymentAddress( JSON.parse(storedPaymentAddress));
      setProductDetails(JSON.parse(storedProductDetails));
      setPaymentAmount(storedPaymentAmount);
       
 
      //  // Clear the session storage
      //  sessionStorage.removeItem("paymentContext");
     }
  },[paymentAddress,paymentAmount,productDetails,setPaymentAddress,setProductDetails,setPaymentAmount]);
  

  // Redirect to the home page after 5 seconds
  useEffect(() => {
    
    const timer = setTimeout(() => {
      router.push("/"); // Change this to the actual path of your home page
    }, 5000);
 
    
   

   // Update the countdown every second
   const interval = setInterval(() => {
    setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
  }, 1000);

    // Clear the timer and interval if the component unmounts
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router]);

  console.log("Payment Amount:",paymentAmount);
  console.log("Payment Address:",paymentAddress);
  console.log("Product Details:",productDetails);
  return (
    <div
      style={{
        display: "flex",
        flexDirection:"column",
        marginTop: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Your payment has been done successfully.
      </h1>
      <p style={{ marginTop: 20, fontSize: 18 }}>
        <strong>Redirecting to home page in {countdown} seconds...</strong>
      </p>
    </div>
  );
};

export default Success;
