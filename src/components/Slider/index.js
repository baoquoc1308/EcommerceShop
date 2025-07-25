import React, { useState, useEffect } from "react";
import "../Slider/index.scss";
import Slidercomponent from "./SliderComponent";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import image3 from "../images/4.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Circle = (props) => {
  return (
    <span
      className={
        props.id === props.active ? "slider-circle active-dot" : "slider-circle"
      }
    ></span>
  );
};

const Slider = () => {
  const [slider, setslider] = useState(1);
  const data = [1, 2, 3];
  const images = [image1, image2, image3];

  const nextSlide = () => {
    if (slider > data.length - 1) {
      setslider(1);
    } else {
      setslider((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (slider <= 1) {
      setslider(data.length);
    } else {
      setslider((prev) => prev - 1);
    }
  };

  const slide = () => {
    if (slider > data.length - 1) {
      setslider(1);
    } else {
      setslider((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(slide, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [slider]);

  return (
    <div className="home-container">
      {data.map((el, i) => (
        <Slidercomponent
          className={`slide-${i + 1} slide`}
          key={i}
          style={{ transform: `translateX(${100 * (i + 1 - slider)}%)` }}
          image={images[i]}
        />
      ))}
      <div className="slider-dots">
        {data.map((el, i) => (
          <Circle key={i} active={slider} id={i + 1} />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Slider;
