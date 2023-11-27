"use client";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  async function login(e) {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
     
      if (res.ok) {
        setError(false);

        setSuccess(true);
        setShowLogout(true);
        setMessage("Logged In Successfully");
      } else {
        setSuccess(false);
        setError(true);
        setShowLogout(false);
        setMessage("Invalid Credentials.");
        return;
      }

      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mb-8" style={{ backgroundColor: "wheat" }}>
      {/* Navbar */}
      <Navbar />
      {/* end navbar */}
      <div
        className="bg-dark container-fluid mx-0 sticky-top p-1"
        style={{ zIndex: 2 }}
      >
        <h1 className="text-light mt-4 ">Login Form</h1>
      </div>
      {/* error message */}
      {error ? (
        <div class="alert alert-danger" role="alert">
          {message}
        </div>
      ) : null}

      {success ? (
        <div class="alert alert-success" role="alert">
          {message}
        </div>
      ) : null}

      <form className="container">
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>

        <button type="submit" onClick={login} className="btn btn-primary mb-5">
          Submit
        </button>
        {/* Logout button */}
        {showLogout ? (
          <button
            type="button"
            className="btn btn-success mb-5 ms-5"
            onClick={() => signOut()}
          >
            Logout
          </button>
        ) : null}
        </div>

        <div className="my-2 mb-4">
          <Link
            href={"/register"}
            style={{ textDecoration: "none" }}
            className="h3"
          >
            Do Not Have an Account?
            <span style={{ textDecoration: "underline" }}>Register Here</span>
          </Link>
        </div>
      </form>
      {/* footer */}
      <Footer />
    </div>
  );
}
