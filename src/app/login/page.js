"use client"
import {useState} from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Login() {

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();

    function click(e){
        e.preventDefault();
        alert(email,password);
    }


  return (
    <div className="mb-8 background">
        {/* Navbar */}
        <Navbar/>
        {/* end navbar */}
      <form className="container-fluid" >
        <div className="bg-dark container-fluid mx-0 sticky-top p-1">
          <h1 className="text-light mt-4 ">Login Form</h1>
        </div>

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

        <button type="submit" onClick={click} className="btn btn-primary mb-5">
          Submit
        </button>
      </form>
      {/* footer */}
      <Footer />
    </div>
  );
}
