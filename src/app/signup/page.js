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
  const [usernameExists, setUsernameExists] = useState(false); // New state for username existence

  const checkUsernameExistence = async (username) => {
    try {
      const response = await axios.get(`api/users/checkUsername?username=${username}`);
      return response.data.exists;
    } catch (error) {
      toast.error("Error checking username existence!",{ position: "top-right" });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const isUsernameExists = await checkUsernameExistence(user.username.trim().toLowerCase());

      if (isUsernameExists.status) {
        setUsernameExists(true);
        toast.error(isUsernameExists.error, { position: "top-right" });

         // reseting the fields
         setUser({
          username: "",
          email: "",
          password: "",
        });
      } else {
        // Handle signup form submission logic here using the 'user' state
        const response = await axios.post("api/users/signup", user);
        router.push("/login");

        toast.success(
          "Username: " + user.username + " with email: " + user.email + " created Successfully.",
          { position: "top-right" }
        );

        // reseting the fields
        setUser({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error("Signup Failed..", { position: "top-right" });
       // reseting the fields
       setUser({
        username: "",
        email: "",
        password: "",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the 'user' state based on the input field
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value.trim().toLowerCase(),
    }));
  };

  // const handleSignupClick = async () => {
  //   const isUsernameExists = await checkUsernameExistence(user.username);

  //   if (isUsernameExists.status) {
  //     setUsernameExists(true);
  //     toast.error(isUsernameExists.error, { position: "top-right" });
  //   } else {
  //     // Proceed with the signup logic
  //     handleSubmit();
  //   }
  // };

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
  }, [user,usernameExists]);


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
              <button type="submit"  disabled={buttonDisabled}>
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
