import React from "react";
import ShowThum from "../components/detail/showThum";
import "../styles/detail.scss"


function Detail() {
  return (
    <div className="main">
      <div className="inner">
        <div className="detail">
          <div className="detail_img_box">
            <div className="detail_thum">
              <div className="thum">
                <img src="#" alt="thum" />
              </div>
              <ShowThum />
            </div>
            <div className="detail_img">{/* js */}</div>
          </div>

          <div className="detail_info">
            <div className="item">
              {/* js */}
              <div className="size">
                <strong>SIZE</strong>
                <ul className="size_list">{/* js */}</ul>
              </div>
            </div>
            <div className="item_check">{/* js */}</div>

            <div className="item_box">
              <div>
                캐시미어 코트 유로컬렉션 22FW 쉬어드 리얼밍크 케이프 자켓
              </div>
              <div className="price">{/* JS */}</div>
            </div>
            <div className="shoping_box">
              <div className="shoping_cart_btn">
                <a href="../../html/cart/cart.html">장바구니</a>
              </div>
              <div className="buy_btn">
                <a href="../../html/login/login.html">구매하기</a>
              </div>
            </div>

            <div className="detail_item_sub_info">
              <ul>
                <li>
                  <div className="table">
                    <div className="table_cell">
                      <span className="material-symbols-outlined">
                        local_shipping
                      </span>
                    </div>
                    <div className="table_cell">
                      <p>배송 및 결제 혜택 안내</p>
                      <span>무료 배송 서비스</span>
                    </div>
                    <div className="table_cell">
                      <a href="/" className="material-symbols-outlined">
                        open_in_new
                      </a>
                    </div>
                  </div>
                  <div className="table">
                    <div className="table_cell">
                      <span className="material-symbols-outlined">
                        receipt_long
                      </span>
                    </div>
                    <div className="table_cell">
                      <p>품질보증기준 및 취급주의사항</p>
                    </div>
                    <div className="table_cell">
                      <a href="/" className="material-symbols-outlined">
                        open_in_new
                      </a>
                    </div>
                  </div>
                  <div className="table">
                    <div className="table_cell">
                      <span className="material-symbols-outlined">
                        credit_card_off
                      </span>
                    </div>
                    <div className="table_cell">
                      <p>교환 및 환불 정책</p>
                      <span>14일 이내에 교환 및 환불 가능</span>
                    </div>
                    <div className="table_cell">
                      <a href="/" className="material-symbols-outlined">
                        open_in_new
                      </a>
                    </div>
                  </div>
                  <div className="table">
                    <div className="table_cell">
                      <span className="material-symbols-outlined">
                        perm_phone_msg
                      </span>
                    </div>
                    <div className="table_cell">
                      <p>상품문의 및 A/S서비스</p>
                      <span>카카오 상담 이용 가능</span>
                    </div>
                    <div className="table_cell">
                      <a href="/" className="material-symbols-outlined">
                        open_in_new
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
