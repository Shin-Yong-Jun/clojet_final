import React, { useState, useRef } from "react";
import WishCarouselBtn from "./WishCarouselBtn.js";
import makeDot from "../../../utils/makeDot.js";

function WishList({ mockListData }) {
  const [fBtnVisible, setfBtnVisible] = useState(true);
  const [bBtnVisible, setbBtnVisible] = useState(false);

  const moveUlwishList = useRef(null);

  const nextItems = (e) => {
    e.preventDefault();
    moveUlwishList.current.style.left = "29%";
    setfBtnVisible(false);
    setbBtnVisible(true);
  };
  const prevItems = (e) => {
    e.preventDefault();
    moveUlwishList.current.style.left = "135%";
    setfBtnVisible(true);
    setbBtnVisible(false);
  };

  return (
    <>
      <div className="wishContainer">
        <p className="myBoardTitle">위시리스트</p>
        <hr />
        <WishCarouselBtn
          moveCarousel={nextItems}
          direction={"next"}
          display={fBtnVisible}
        />
        <WishCarouselBtn
          moveCarousel={prevItems}
          direction={"prev"}
          display={bBtnVisible}
        />
        <div className="wishList">
          <ul ref={moveUlwishList}>
            {
              mockListData.map((obj, index) => {
                return (
                  <li key={obj.id}>
                    <div className="item_img">
                      <a href={obj.link}>
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
                      <p className="price">
                        <strong>{makeDot(obj.saleP)}원</strong>
                      </p>
                      <div className="inputCartBtn">
                        <a href="/">장바구니 담기</a>
                      </div>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    </>
  );
}

export default WishList;
