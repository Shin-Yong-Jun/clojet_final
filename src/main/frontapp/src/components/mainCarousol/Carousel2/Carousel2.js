import React, { useState, useRef } from "react";
import "../Carousel.scss";
import Data_men2 from "./data_men2";
import Data_lady2 from "./data_lady2";
import BtnCarousel2 from "./BtnCarousel2";

function Carousel2() {
  const [fBtnVisible, setfBtnVisible] = useState(true);
  const [bBtnVisible, setbBtnVisible] = useState(false);

  const [gender, setGender] = useState("men");
  const salesMen = useRef();
  const salesLady = useRef();
  const btnMen = useRef();
  const btnLady = useRef();
  const moveUlMen = useRef(null);
  const moveUlLady = useRef(null);

  const nextItems = (e) => {
    e.preventDefault();
    if (gender === "men") {
      moveUlMen.current.style.left = "4%";
      moveUlLady.current.style.left = "100%";
    } else {
      moveUlLady.current.style.left = "4%";
      moveUlMen.current.style.left = "100%";
    }
    setfBtnVisible(false);
    setbBtnVisible(true);
  };
  const prevItems = (e) => {
    e.preventDefault();
    if (gender === "men") moveUlMen.current.style.left = "100%";
    else moveUlLady.current.style.left = "100%";
    setfBtnVisible(true);
    setbBtnVisible(false);
  };

  const switchGender = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("Men")) {
      e.target.style.color = "black";
      moveUlLady.current.style.left = "4%";
      btnLady.current.style.color = "#d6d6d6";
      salesMen.current.style.display = "block";
      salesLady.current.style.display = "none";
      setGender("men");
      setfBtnVisible(true);
      setbBtnVisible(false);
    } else {
      e.target.style.color = "black";
      moveUlMen.current.style.left = "4%";
      btnMen.current.style.color = "#d6d6d6";
      salesMen.current.style.display = "none";
      salesLady.current.style.display = "block";
      setGender("lady");
      setfBtnVisible(true);
      setbBtnVisible(false);
    }
  };

  return (
    <>
      <div className="main_products2">
        <h4>WINTER CLOJET</h4>
        <ul className="test">
          <li>
            <a href="/" className="Men" onClick={switchGender} ref={btnMen}>
              Men
            </a>
          </li>
          <li>
            <a href="/" className="Lady" onClick={switchGender} ref={btnLady}>
              Lady
            </a>
          </li>
        </ul>
      </div>

      <div className="item_container2">
        <BtnCarousel2
          moveCarousel={nextItems}
          direction={"next"}
          display={fBtnVisible}
        />
        <BtnCarousel2
          moveCarousel={prevItems}
          direction={"prev"}
          display={bBtnVisible}
        />

        <div className="item_list weather_men" ref={salesMen}>
          <ul ref={moveUlMen}>
            {Data_men2.map((obj, index) => {
              return (
                <li key={obj.id}>
                  <div className="item_img">
                    <a href="/">
                      <img
                        src={require(`../../../image/menwear${index + 1}.jpg`)}
                        alt={`menwear${index + 1}`}
                      />
                    </a>
                  </div>
                  <div className="item_info">
                    <p className="item_Name">
                      <a href={obj.link}>{obj.title}</a>
                    </p>

                    <span className="disCount">{obj.PercentS}</span>

                    <del className="price"> {obj.basicP}원</del>
                    <p className="price">
                      <strong>{obj.saleP}원</strong>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="item_list weather_lady" ref={salesLady}>
          <ul ref={moveUlLady}>
            {Data_lady2.map((obj, index) => {
              return (
                <li key={obj.id}>
                  <div className="item_img">
                    <a href="/">
                      <img
                        src={require(`../../../image/ladywear${index + 1}.jpg`)}
                        alt={`ladywear${index + 1}`}
                      />
                    </a>
                  </div>
                  <div className="item_info">
                    <p className="item_Name">
                      <a href={obj.link}>{obj.title}</a>
                    </p>

                    <span className="disCount">{obj.PercentS}</span>

                    <del className="price"> {obj.basicP}원</del>
                    <p className="price">
                      <strong>{obj.saleP}원</strong>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Carousel2;
