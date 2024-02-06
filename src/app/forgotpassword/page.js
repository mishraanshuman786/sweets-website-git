"use client"
import React, { useEffect, useState } from 'react';
import './forgotpassword.css';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();

  const [updateData, setUpdateData] = useState({});

  useEffect(()=>{
    localStorage.setItem("reload",true);
  },[]);

  const handleSubmit = async(event) => {
    event.preventDefault();

    setUpdateData({
      username: username.trim().toLowerCase(),
      password: password
    });

    const jsonData = JSON.stringify(updateData);
    const response = await fetch("/api/users/forgotPassword",{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData 
    });

     console.log("forgot password response:",response.data);
    // Here you would implement the logic to reset the password using the provided username
    console.log('Password reset request submitted for username:', username);
    // Reset the form
    setUsername('');
  };

  return (
    <div className="forgot-password-form-container">
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
          <label htmlFor="username">New Password:</label>
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
          <label htmlFor="username">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
