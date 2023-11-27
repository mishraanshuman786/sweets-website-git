"use client";
import Link from "next/link";
import { useState } from "react";
export default function RegisterForm() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [errorMessage,setErrorMessage]=useState("");

 async function register(e) {
    e.preventDefault();
    if (!name || !email || !password) {
        setError(true);
        setErrorMessage("Please fill in all the fields.");
        return;
    }
    else{
         try{
            setError(false);
            setErrorMessage("");
            // fetching the userExists API
           const res=await fetch("api/userExists", {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({email}),
           });
           const {user}=await res.json();

           if(user){
            setError(true);
            setErrorMessage("User already Exists.");
            return;
           }



//      creating the users
            let response=await fetch("api/register",{
              method:"POST",
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({
                  name,email,password
              })
             
            });

            if(response.ok){
              setName("");
              setEmail("");
              setPassword("");
            }
        }catch(error){
            console.log("error:",error);
      
        }
    }
    
  }

 

  return (
    <div>
      <div
        className="bg-dark container-fluid mx-0 sticky-top p-1"
        style={{ zIndex: 2 }}
      >
        <h1 className="text-light mt-4 ">User Registration</h1>
      </div>
      {/* error alert */}
      {
         (error)?(
            <div>
            <div class="alert alert-danger" role="alert">
              There is some error. {errorMessage}
            </div>
          </div>
          ):null
        }
      
      
      {/* form handling */}
      <form className="container">
        <div className="my-4">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

        <button
          type="submit"
          onClick={register}
          className="btn btn-primary mb-5"
        >
          Register Here
        </button>

        <div className="my-2 mb-4">
          <Link
            href={"/login"}
            style={{ textDecoration: "none" }}
            className="h3"
          >
            Already Have an Account?
            <span style={{ textDecoration: "underline" }}>Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
