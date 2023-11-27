"use client"
import {useState} from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Login() {

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();

    function login(e){
        e.preventDefault();
        alert(email,password);
    }


  return (
    <div className="mb-8" style={{backgroundColor:"wheat"}}>
        {/* Navbar */}
        <Navbar/>
        {/* end navbar */}
        <div className="bg-dark container-fluid mx-0 sticky-top p-1" style={{zIndex:2}}>
          <h1 className="text-light mt-4 ">Login Form</h1>
        </div>
      <form className="container" >
        

        <div className="my-4">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control "
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We will never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label ">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        <button type="submit" onClick={login} className="btn btn-primary mb-5">
          Submit
        </button>
        <div className="my-2 mb-4">
        <Link href={"/register"} style={{textDecoration:"none"}} className="h3">
        Don't Have an Account?<span style={{textDecoration:"underline"}}>Register Here</span>
        
        </Link>
        </div>

      </form>
      {/* footer */}
      <Footer />
    </div>
  );
}
