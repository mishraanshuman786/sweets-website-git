"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./blog.css";

export default function Blog() {
 
  return (
    <div>
      {/* Navbar */}
      <Navbar/>

      {/* blog heading */}
      <div className="blog-heading">
        <h1>BLOGS</h1>
      </div>
      {/* Footer */}
      <Footer />
    </div>

  );
}
