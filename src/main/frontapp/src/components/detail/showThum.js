import React from 'react'
import DetailData from "./detailData";

function ShowThum() {
  const thum_imgAr = DetailData[0].thum_imgAr;
  return (
    <ul>
      {thum_imgAr.map((value, index) => (
        <li key={index}>
          <a href="/">
            <img src={process.env.PUBLIC_URL + '/image/detailImages'+value} alt={`thum_img_${index}`} data-no={index} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default ShowThum

