"use client"
import React from 'react';
import "./globals.css";
import '../app/components/styles/NotFound.css';
import { useRouter } from "next/navigation";

function NotFound() {
  const router=useRouter();

  return (
    <div className="container">
      <div className="message">
        <p>Oops! Page not found.</p>
        <p>It seems like you&lsquo;re lost in the sweetness. Let&lsquo;s get you back home!</p>
      </div>
      <button  className="backButton" onClick={()=>{
        localStorage.setItem("reload", true);
        router.replace("/");
      }}>
        Go back to Home
      </button>
    </div>
  );
}

export default NotFound;
