import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./productcreate.scss";
import axios from "axios";
import { paresDate } from "../../../utils/parseDate";

function ProductCreate() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const formData = new FormData();
        formData.append("productName", data.get("productName"));
        formData.append("genderCode", data.get("genderCode"));
        formData.append("productPrice", data.get("productPrice"));
        formData.append("ccType", data.get("ccType"));
        formData.append("csType", data.get("csType"));
        formData.append("productStock", data.get("productStock"));
        formData.append("ctGrp", data.get("ctGrp"));
        formData.append("cmGrp", data.get("cmGrp"));
        formData.append("productEnroll", paresDate());

        const thumUrlFile = data.get("productThumUrl");
        if (thumUrlFile) {
            formData.append("productThumUrl", thumUrlFile);
        }

        const detailFile = data.get("productDetail");
        if (detailFile) {
            formData.append("productDetail", detailFile);
        }

        try{
            console.log(formData);
            axios
                .post("/product/create", formData)
                .then(() => {
                        alert("상품이 등록되었습니다.");
                        navigate("/product");
                })
                .catch((error)=>{
                    alert("이미 등록되어있는 상품명입니다.")
                    console.log(error)
                })
        }catch{
            alert("상품등록 실패")
        }
    };

    return (
        <div className="productEditContainer">
            <div className="productEditTitle">상품추가하기</div>
            <hr />
            <div className="productEditBox">
                <form
                    method="post"
                    className="productEditForm"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <div className="productColumnTitle">
                        상품 썸네일 링크주소
                    </div>
                    <input type="file" name="productThumUrl" />

                    <div className="productColumnTitle">상품명</div>
                    <input type="text" name="productName" />

                    <div className="productColumnTitle">상품성별구분</div>
                    <select name="genderCode" defaultValue="f">
                        <option value="f">여자</option>
                        <option value="m">남자</option>
                        <option value="u">유니</option>
                    </select>

                    <div className="productColumnTitle">상품가격</div>
                    <input type="text" name="productPrice" />

                    <div className="productColumnTitle">상품색상</div>
                    <select name="ccType" defaultValue="white">
                        <option value="white">흰색</option>
                        <option value="ivory">아이보리</option>
                        <option value="khaki">카키</option>
                        <option value="grey">그레이</option>
                        <option value="black">블랙</option>
                        <option value="red">레드</option>
                    </select>
                    <div className="productColumnTitle">상품사이즈</div>
                    <select name="csType" defaultValue="m">
                        <option value="xs">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                        <option value="xxl">XXL</option>
                    </select>

                    <div className="productColumnTitle">상품재고량</div>
                    <input type="number" name="productStock" />

                    <div className="productColumnTitle">상품대분류</div>
                    <select name="ctGrp" defaultValue="n">
                        <option value="n">NEW</option>
                        <option value="s">SALE</option>
                        <option value="b">BEST</option>
                        <option value="m">MENS</option>
                        <option value="l">LADIES</option>
                    </select>

                    <div className="productColumnTitle">상품중분류</div>
                    <select name="cmGrp" defaultValue="n">
                        <option value="n">아우터</option>
                        <option value="s">원피스</option>
                        <option value="b">자켓</option>
                        <option value="m">바지</option>
                        <option value="l">스커트</option>
                        <option value="l">양말</option>
                    </select>

                    <div className="productColumnTitle">상품상세이미지</div>
                    <input
                        type="file"
                        name="productDetail"
                        multiple
                    />
                    
                    <button className="editProductBtn" type="submit">제출</button>
                </form>
            </div>
        </div>
    );
}

export default ProductCreate;
