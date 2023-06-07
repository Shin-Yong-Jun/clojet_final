import React from "react";
import "./orderFlow.scss";
import { Link } from "react-router-dom";
import orderData from "./orderData.js";

function OrderFlow() {
  return (
    <>
      <div className="myOrderFlow">
        <p className="myBoardTitle">나의 주문상품</p>
        <hr />
        <ul className="oStepList">
          <li className="oStep 1">
            <p>결제완료</p>
            <Link to={"/"}>
              <span className="circle">{orderData.purchase}</span>
            </Link>
          </li>
          <li className="arrow">
            <span className="material-symbols-outlined icon2">
              navigate_next
            </span>
          </li>
          <li className="oStep 2">
            <p>상품준비중</p>
            <Link to={"/"}>
              <span className="circle">{orderData.ready}</span>
            </Link>
          </li>
          <li className="arrow">
            <span className="material-symbols-outlined icon2">
              navigate_next
            </span>
          </li>
          <li className="oStep 3">
            <p>배송중</p>
            <Link to={"/"}>
              <span className="circle">{orderData.delivery}</span>
            </Link>
          </li>
          <li className="arrow">
            <span className="material-symbols-outlined icon2">
              navigate_next
            </span>
          </li>
          <li className="oStep 4">
            <p>배송완료</p>
            <Link to={"/"}>
              <span className="circle">{orderData.arrived}</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default OrderFlow;
