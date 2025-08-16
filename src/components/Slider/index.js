import React, { useState, useEffect, useCallback } from "react";
import "../Slider/index.scss";
import Slidercomponent from "./SliderComponent";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import image3 from "../images/4.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Circle = (props) => {
  return (
    <button
      className={
        props.id === props.active ? "slider-circle active-dot" : "slider-circle"
      }
      onClick={() => props.onClick(props.id)}
      aria-label={`Go to slide ${props.id}`}
    ></button>
  );
};

const Slider = () => {
  const [slider, setslider] = useState(1);
  const data = [1, 2, 3];
  const images = [image1, image2, image3];
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      if (slider >= data.length) {
        setslider(1);
      } else {
        setslider((prev) => prev + 1);
      }
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      if (slider <= 1) {
        setslider(data.length);
      } else {
        setslider((prev) => prev - 1);
      }
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const goToSlide = (slideNumber) => {
    if (!isTransitioning && slideNumber !== slider) {
      setIsTransitioning(true);
      setslider(slideNumber);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const autoSlide = useCallback(() => {
    if (slider >= data.length) {
      setslider(1);
    } else {
      setslider(slider + 1);
    }
  }, [slider, data.length]);

  useEffect(() => {
    const interval = setInterval(autoSlide, 5000);
    return () => clearInterval(interval);
  }, [autoSlide]);

  return (
    <div className="home-container">
      <div className="slider-wrapper">
        {data.map((el, i) => (
          <Slidercomponent
            className={`slide-${i + 1} slide`}
            key={i}
            style={{ transform: `translateX(${100 * (i + 1 - slider)}%)` }}
            image={images[i]}
          />
        ))}
      </div>
      
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="slider-nav-btn slider-nav-prev"
        aria-label="Previous slide"
      >
        <ChevronLeft className="slider-nav-icon" />
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="slider-nav-btn slider-nav-next"
        aria-label="Next slide"
      >
        <ChevronRight className="slider-nav-icon" />
      </button>

      <div className="slider-dots">
        {data.map((el, i) => (
          <Circle 
            key={i} 
            active={slider} 
            id={i + 1} 
            onClick={goToSlide}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;