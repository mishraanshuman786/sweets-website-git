"use client"
import React, { useEffect, useState } from "react";
import "./forgotpassword.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("reload", true);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    const updateData = {
      username: username.trim().toLowerCase(),
      password: password,
    };

    const jsonData = JSON.stringify(updateData);
    const response = await fetch("/api/users/forgotPassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    const responseData = await response.json();
   
    if (responseData.status) {
      alert(responseData.message);
      // Reset the form
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } else {
      toast.error(responseData.message, { position: "top-right" });
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="forgot-password-form-container">
      <button className="navigate" onClick={() => router.replace("/")}>
        <FaArrowAltCircleLeft />
      </button>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className={!passwordMatch ? "password-mismatch" : ""}
            required
          />
          {!passwordMatch && (
            <span className="error-message">
              Passwords do not match. Please try again.
            </span>
          )}
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
