import React from "react";
import "./Slider.scss";
import leftArrow from "./icon/left-arrow.svg";
import rightArrow from "./icon/right-arrow.svg";

function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? rightArrow : leftArrow} alt="" />
    </button>
  );
}

export default BtnSlider;
