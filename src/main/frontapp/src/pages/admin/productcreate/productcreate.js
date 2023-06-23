import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./productcreate.scss";
import axios from "axios";
import { paresDate } from "../../../utils/parseDate";

function ProductCreate() {
    const navigate = useNavigate();

    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [top, setTop] = useState([]);
    const [mid, setMid] = useState([]);
    const [gender, setGender] = useState([]);

    useEffect(() => {
        axios
            .get("/category")
            .then((result) => {
                setSize(result.data.csType);
                setColor(
                    result.data.ccType.map((ccType, index) => ({
                        ccType: ccType,
                        ccValMean: result.data.ccValMean[index],
                    }))
                );
                setTop(
                    result.data.ctGrp.map((ctGrp, index) => ({
                        ctGrp: ctGrp,
                        ctValMean: result.data.ctValMean[index],
                    }))
                );
                setMid(
                    result.data.cmGrp.map((cmGrp, index) => ({
                        cmGrp: cmGrp,
                        cmValMean: result.data.cmValMean[index],
                    }))
                );
                setGender(
                    result.data.genderCode.map((genderCode, index) => ({
                        genderCode: genderCode,
                        genderMean: result.data.genderMean[index],
                    }))
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const selectedCcTypes = Array.from(formData.getAll("ccType")).filter(
            Boolean
        );
        formData.set("ccType", selectedCcTypes.join(","));

        const selectedCsTypes = Array.from(formData.getAll("csType")).filter(
            Boolean
        );
        formData.set("csType", selectedCsTypes.join(","));

        formData.set("productEnroll", paresDate());

        // 파일 첨부
        const fileThumInput = e.currentTarget.elements.productThumUrl;
        if (fileThumInput.files && fileThumInput.files.length > 0) {
            formData.append("productThumUrl", fileThumInput.files[0]);
        }
        const fileDetailInput = e.currentTarget.elements.productDetail;
        if (fileDetailInput.files && fileDetailInput.files.length > 0) {
            formData.append("productDetail", fileDetailInput.files[0]);
        }
        axios
            .post("/product/create", formData)
            .then((response) => {
                if (response.status === 200) {
                    alert("상품이 등록되었습니다.");
                    navigate("/admin/product");
                }
            })
            .catch((error) => {
                alert("상품등록실패");
                console.log(error);
            });
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

                    <div className="productColumnTitle">상품상세이미지</div>
                    <input type="file" name="productDetail" />

                    <div className="productColumnTitle">상품명</div>
                    <input type="text" name="productName" />

                    <div className="productColumnTitle">상품성별구분</div>
                    {gender.map((itemV) => {
                        return (
                            <label>
                                <input
                                    type="radio"
                                    name="genderCode"
                                    value={itemV.genderCode}
                                />
                                {itemV.genderMean}
                            </label>
                        );
                    })}
                    <div className="productColumnTitle">상품가격</div>
                    <input type="text" name="productPrice" />

                    <div className="productColumnTitle">상품색상</div>
                    {color.map((itemV) => {
                        return (
                            <label>
                                <input
                                    type="checkbox"
                                    name="ccType"
                                    value={itemV.ccType}
                                />
                                {itemV.ccValMean}
                            </label>
                        );
                    })}

                    <div className="productColumnTitle">상품사이즈</div>
                    {size.map((itemV) => {
                        return (
                            <label>
                                <input
                                    type="checkbox"
                                    name="csType"
                                    value={itemV}
                                />
                                {itemV}
                            </label>
                        );
                    })}

                    <div className="productColumnTitle">상품대분류</div>
                    {top.map((itemV) => {
                        return (
                            <label>
                                <input
                                    type="radio"
                                    name="ctGrp"
                                    value={itemV.ctGrp}
                                />
                                {itemV.ctValMean}
                            </label>
                        );
                    })}

                    <div className="productColumnTitle">상품중분류</div>
                    {mid.map((itemV) => {
                        return (
                            <label>
                                <input
                                    type="radio"
                                    name="cmGrp"
                                    value={itemV.cmGrp}
                                />
                                {itemV.cmValMean}
                            </label>
                        );
                    })}

                    <button className="editProductBtn" type="submit">
                        제출
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProductCreate;
