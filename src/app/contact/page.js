"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  function clicked(e) {
    e.preventDefault();
    alert(name, email);
  }

  async function sendMail() {
    let response = await fetch("api/sendEmail", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        to: email,
        subject: "For Training",
        text: message,
      }),
    });

    response = await response.json();
    if (response.success) {
      alert("Mail Send Successfully.");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      alert("There is some problem in creating new User.");
    }
  }

  return (
    <div style={{ backgroundImage: "/public/images/background.jpg" }}>
      {/* Navbar */}
      <Navbar />
      {/* content */}
      <div style={{ backgroundColor: "wheat" }}>
        <div
          className="bg-dark container-fluid mt-2 sticky-top p-2"
          style={{ zIndex: 2 }}
        >
          <h1 className="text-light mt-4">Contact Us</h1>
        </div>

        <form className="py-4 container">
          <div className="mb-3">
            <label
              for="exampleInputName1"
              className="form-label text-dark fs-5"
            >
              Name
            </label>
            <input
              type="text"
              className="form-control text-dark fs-5"
              id="exampleInputName1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3 my-4">
            <label
              for="exampleInputEmail1"
              className="form-label text-dark fs-5"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control text-dark fs-5"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
            />
            <div id="emailHelp" className="form-text text-dark fs-5">
              We will never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3 my-4">
            <label for="exampleFormControlTextarea1" className="fs-5">
              Write Your Message
            </label>
            <textarea
              className="form-control fs-5"
              id="exampleFormControlTextarea1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary" onClick={clicked}>
            Submit
          </button>
        </form>
      </div>
      {/* ============================================================ */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
