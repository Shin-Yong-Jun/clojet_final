import React from "react";
import "../Carousel.scss";
import backBtn from "../icons/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import forwardBtn from "../icons/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg";

function BtnCarousel1({ moveCarousel, direction, display }) {
  const buttonStyle = {
    display: display ? "block" : "none",
  };

  return (
    <a
      onClick={moveCarousel}
      className={direction === "next" ? "btn_forward" : "btn_back"}
      href="/"
    >
      <img
        src={direction === "next" ? forwardBtn : backBtn}
        style={buttonStyle}
        alt="back_img"
      />
    </a>
  );
}

export default BtnCarousel1;
