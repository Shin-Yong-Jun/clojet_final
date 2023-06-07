import React, { useState, useRef } from "react";
import RecentCarouselBtn from "./RecentCarouselBtn.js";
import makeDot from "../../../utils/makeDot.js";

function RecentList({ mockListData }) {
  const [fBtnVisible, setfBtnVisible] = useState(true);
  const [bBtnVisible, setbBtnVisible] = useState(false);

  const moveUlrecentList = useRef(null);

  const nextItems = (e) => {
    e.preventDefault();
    moveUlrecentList.current.style.left = "29%";
    setfBtnVisible(false);
    setbBtnVisible(true);
  };
  
  const prevItems = (e) => {
    e.preventDefault();
    moveUlrecentList.current.style.left = "135%";
    setfBtnVisible(true);
    setbBtnVisible(false);
  };

  return (
    <>
      <div className="recentContainer">
        <p className="myBoardTitle">최근 본 상품</p>
        <hr />
        <RecentCarouselBtn
          moveCarousel={nextItems}
          direction={"next"}
          display={fBtnVisible}
        />
        <RecentCarouselBtn
          moveCarousel={prevItems}
          direction={"prev"}
          display={bBtnVisible}
        />
        <div className="recentList">
          <ul ref={moveUlrecentList}>
            {
              mockListData.map((obj, index) => {
                return (
                  <li key={obj.id}>
                    <div className="item_img">
                      <a href={obj.link}>
                        <img
                          src=
                          {require(`../../../image/menwear${index + 1}.jpg`)}
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

export default RecentList;
