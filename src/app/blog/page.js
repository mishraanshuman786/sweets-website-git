"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./blog.css";

export default function Blog() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
    
      <div className="content">
        {/* messages */}
         <div>
            {/* messages */}



         </div>
        {/* messages */}
        {/* blogging controls */}
        <div className="blogging-controls">
          <form className="container">
            <div class="form-group mt-1">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Write Your Blog....."
                rows="4"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-success mt-2  mb-2" style={{width:140}}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
