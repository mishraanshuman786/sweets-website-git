"use client";
import styles from "./signup.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import { toast } from "react-toastify";

function Signup() {
  const router = useRouter();
  const routerNavigation=useRouter();
  // State for user information
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading,setLoading]=useState(false);


  const handleSubmit =async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // Handle signup form submission logic here using the 'user' state
      console.log("User Information:", user);
     const response=await axios.post("api/users/signup",user);
     console.log("Success:",response.data);
     router.push("/login");

      toast.success("Username: " + user.username+" with email: "+user.email+" created Successfully.", { position: "top-right" });

      // reseting the fields
      setUser({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
     toast.error("Signup Failed..",{ position: "top-right" });
    } finally{
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
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
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
        <button className={styles.navigate} onClick={()=>routerNavigation.push("/login")}><FaArrowAltCircleLeft /></button>
       {loading?"processing":"SIGNUP"}
        <div className={styles["signup-form"]}>
          <form onSubmit={handleSubmit}>
            <div className={styles["form-group"]}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Enter Username"
                required
              />
            </div>

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
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
