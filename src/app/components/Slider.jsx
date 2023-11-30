"use client";
import { useEffect } from "react";
import "./styles/Slider.css";
export default function Slider() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    // <!-- image slider  -->
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="active carousel-item  slider p-4">
          <img
            src="/images/besanladdo.jpg"
            className="d-block image"
            alt="..."
          />
          <p className="text">
            Besan laddu can provide good amount of protein, folic acid which
            helps in boosting iron levels. Besan has a low glycemic index &
            hence good for maintaining ideal sugar levels.
          </p>
        </div>
        <div className="carousel-item slider p-4">
          <img src="/images/coconut.jpeg" className="d-block image" alt="..." />
          <p className="text">
            Dry Fruit Laddu is rich in proteins, calcium and other
            micronutrients, which helps in maintaining healthy bones and plays
            an important role in strengthening them.
          </p>
        </div>
        <div className="carousel-item slider p-4">
          <img
            src="/images/dryfruits.jpeg"
            className="d-block image"
            alt="..."
          />
          <p className="text">
            Coconut Laddus are highly nutritious as they are packed with
            protein, minerals, and significant quantities of B vitamins. Being
            high in manganese, the consumption of coconut boosts bone health.
          </p>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
