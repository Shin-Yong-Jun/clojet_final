import React, { useState, useEffect, useCallback } from "react";
import "./Slider.scss";
import BtnSlider from "./BtnSlider.js";
import dataSlider from "./dataSlider.js";

function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [autoplay, setAutoplay] = useState(true);

  const nextSlide = useCallback(() => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  }, [slideIndex]);

  const prevSlide = useCallback(() => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  }, [slideIndex]);

  const moveDot = useCallback((index) => {
    setSlideIndex(index);
  }, []);

  useEffect(() => {
    let intervalId;
    if (autoplay) {
      intervalId = setInterval(() => {
        setSlideIndex((slideIndex) =>
          slideIndex !== dataSlider.length ? slideIndex + 1 : 1
        );
      }, 3000);
    }
    return () => clearInterval(intervalId);
  });

  const handleMouseEnter = () => {
    setAutoplay(false);
  };

  const handleMouseLeave = () => {
    setAutoplay(true);
  };

  return (
    <div
      className="container-slider"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {dataSlider.map((obj, index) => {
        return (
          <div
            key={obj.id}
            className={slideIndex === index + 1 ? "slide-active-anim" : "slide"}
          >
            <img
              src=
              {require(`../../image/clojet-mainss-slider${index + 1}.png`)}
              alt=""
            />
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />
      <div className="container-dots">
        {Array.from({ length: 3 }).map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
