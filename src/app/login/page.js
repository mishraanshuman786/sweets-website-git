"use client";
import styles from "./login.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";

import { toast } from "react-toastify";
import { CartState } from "@/context/Context";

function Login() {
  const navigationRouter=useRouter();
  const router = useRouter();
  // State for user information
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { dispatch } = CartState();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // Handle signup form submission logic here using the 'user' state
      const response = await axios.post("api/users/login", user);
  
      toast.success("Login Success.", { position: "top-right" });

      // setting the localStorage
      const loginStatus={
        data:response.data,
        status:true
      }
      const jsonString=JSON.stringify(loginStatus);
      localStorage.setItem("loginStatus",jsonString);

      // fetching cart data from the particular user cart
      const cartObject= await axios.post("api/cart/fetchCart", response.data);
      console.log("cartObject:",cartObject.data.data.cartItems);
       // Dispatch AUTH_SUCCESS action with user-specific cart data
       if(cartObject.status===200 && cartObject.data.data.cartItems!=null)
       {
        dispatch({ type: 'AUTH_SUCCESS', payload: { cart: cartObject.data.data.cartItems } });
       }
       else{
        dispatch({ type: 'AUTH_SUCCESS', payload: { cart:[] } });
       }
      
      // Redirect to the homepage with the login status as a query parameter
      router.push("/");

      // reseting the fields
      setUser({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error("Login Failed..", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the 'user' state based on the input field
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className={styles["signup-container"]}>
      <div
        className={`${styles["signup-container"]} ${styles["signup-title"]}`}
      >
         <button className={styles.navigate} onClick={()=>navigationRouter.push("/")}><FaArrowAltCircleLeft /></button>
        {loading ? "processing" : "LOGIN"}
        <div className={styles["signup-form"]}>
          <form onSubmit={handleSubmit}>
            <div className={styles["form-group"]}>
             
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <button type="submit" disabled={buttonDisabled}>
                Log In
              </button>
              <p style={{ fontSize: 20, fontWeight: "normal", marginTop: 10 }}>
                If you are not already Registered. Go To{" "}
                <Link href="/signup">Sign Up Page</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
