import React from 'react'
import statusData from "./statusData.js";
import "./statusBox.scss";


// 소수점 표시 함수
function makeDot(n) {
  let s1 = n.toString();
  let d = s1.indexOf();
  let s2 = d === -1 ? s1 : s1.slide(0, d);

  for (let i = s2.length - 3; i > 0; i -= 3)
    s2 = s2.slice(0, i) + "," + s2.slice(i);

  if (d !== -1) {
    s2 += s1.slice(d);
  }
  return s2;
}


function StatusBox() {
  return (
    <>
    <ul className="statusBox">
          <li className="box"><p>{statusData.coupon}</p><p>쿠폰</p></li>
          <li className="box"><p>{makeDot(statusData.point)}M</p><p>나의 포인트</p></li>
          <li className="box"><p>{statusData.request}</p><p>문의</p></li>
          <li className="box"><p>{statusData.wish}</p><p>위시리스트</p></li>
        </ul>
    
    
    
    </>
  )
}

export default StatusBox