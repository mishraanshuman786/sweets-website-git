"use client";
import { useEffect } from "react";
import "../components/styles/slider.css";
export default function Slider() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
        // Initialize the carousel
    
    }
  }, []);

  return (
    // <!-- image slider  -->
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel slide">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="/ProductImages/flexseed1.jpg" class="d-block w-100 sliderimage" alt="..."   />
      </div>
      <div class="carousel-item">
        <img src="/ProductImages/flexseed2.jpg" class="d-block w-100 sliderimage" alt="..."   />
      </div>
      <div class="carousel-item">
        <img src="/ProductImages/coconut2.jpg" class="d-block w-100 sliderimage" alt="..."   />
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
    <br/>
  </div>
  );
}
