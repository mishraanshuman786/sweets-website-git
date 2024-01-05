// "use client";
import { useEffect, useState } from "react";
import "../components/styles/slider.css";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 8); // Adjust the number based on the total number of slides
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const translateValue = `-${currentIndex * 100}%`;

  return (
    <div id="slider" style={{ marginTop: 20,overflow: "hidden" }}>
      <div
        className="slider-container"
        style={{ display: "flex", transition: "transform 0.5s ease", transform: `translateX(${translateValue})` }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={`slider-item`}
            style={{ flex: "0 0 100%", border: "1px solid black", borderRadius: 10 }}
          >
            <img
              src={`/images/banner${index + 1}.jpg`}
              className="d-block w-100 sliderimage"
              alt={`Banner ${index + 1}`}
              style={{borderRadius:10}}
            />
          </div>
        ))}
      </div>
      <button
        className="slider-control prev"
        onClick={() => goToSlide((currentIndex - 1 + 8) % 8)}
      >
        <GrPrevious />
      </button>
      <button
        className="slider-control next"
        onClick={() => goToSlide((currentIndex + 1) % 8)}
      >
        <GrNext />
      </button>
      <br />
    </div>
  );
}
