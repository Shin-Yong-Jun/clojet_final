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
    const [selectedCcTypes, setSelectedCcTypes] = useState([]);
    const [selectedCsTypes, setSelectedCsTypes] = useState([]);

    useEffect(() => {
        axios
            .get("/category")
            .then((result) => {
                setSize(result.data.csType);
                setColor(result.data.ccType);
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

    const handleCheckboxChange = (e) => {
        const selectedCcTypes = Array.from(
            document.querySelectorAll('input[name="ccType"]:checked')
        ).map((checkbox) => checkbox.value);
        const selectedCsTypes = Array.from(
            document.querySelectorAll('input[name="csType"]:checked')
        ).map((checkbox) => checkbox.value);

        setSelectedCcTypes(selectedCcTypes);
        setSelectedCsTypes(selectedCsTypes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        const fileThumInput = e.currentTarget.elements.productThumUrl;
        if (fileThumInput.files && fileThumInput.files.length > 0) {
            formData.append("productThumUrl", fileThumInput.files[0]);
        }
        const fileDetailInput = e.currentTarget.elements.productDetail;
        if (fileDetailInput.files && fileDetailInput.files.length > 0) {
            formData.append("productDetail", fileDetailInput.files[0]);
        }

        formData.append("ccType", selectedCcTypes.join(","));
        formData.append("csType", selectedCsTypes.join(","));
        formData.append("productEnroll", paresDate());

        const productName = e.currentTarget.elements.productName.value;
        const genderCode = e.currentTarget.elements.genderCode.value;
        const productPrice = e.currentTarget.elements.productPrice.value;
        const ctGrp = e.currentTarget.elements.ctGrp.value;
        const cmGrp = e.currentTarget.elements.cmGrp.value;

        formData.append("productName", productName);
        formData.append("genderCode", genderCode);
        formData.append("productPrice", productPrice);
        formData.append("ctGrp", ctGrp);
        formData.append("cmGrp", cmGrp);

        // ccCsInputs를 가져올 때 오류가 발생하는 부분 수정
        const ccCsInputs = Array.from(
            document
                .getElementById("ccCsInputContainer")
                .getElementsByTagName("input")
        );

        ccCsInputs.forEach((ccCsInput) => {
            formData.append("ccCsText", ccCsInput.name);
            formData.append("ccCsQty", ccCsInput.value);
        });

//---------------------- 서버로 쏘기 ---------------------------------
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
                console.log(error.response);
            });
    };

    return (
        <div className="productEditContainer">
            <div className="productEditTitle">상품추가하기</div>
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
                    <hr/>
                    <div className="productColumnTitle">상품상세이미지</div>
                    <input type="file" name="productDetail" />
                    <hr/>

                    <div className="productColumnTitle">상품명</div>
                    <input 
                    type="text"
                    name="productName"
                    placeholder="상품명을 적어주세요"
                    className="tb"/>
                    <hr/>

                    <div className="productColumnTitle">상품성별구분</div>
                    {gender.map((itemV) => {
                        return (
                            <label key={itemV.genderCode}>
                                <input
                                    type="radio"
                                    name="genderCode"
                                    value={itemV.genderCode}
                                    />
                                {itemV.genderMean}
                            </label>
                        );
                    })}
                    <hr/>
                    <div className="productColumnTitle">상품가격</div>
                    <input 
                    type="text" 
                    name="productPrice" 
                    className="tb"
                    placeholder="회계점 제외, 숫자만 입력해주세요. 159,000원 -> 159000 " />
                    <hr/>

                    <div className="productColumnTitle">상품색상</div>
                    {color.map((itemV) => {
                        return (
                            <label key={itemV}>
                                <input
                                    type="checkbox"
                                    name="ccType"
                                    value={itemV}
                                    className="cb"
                                    onChange={handleCheckboxChange}
                                    />
                                    {itemV}
                                    </label>
                        );
                    })}
                    <hr/>


                    <div className="productColumnTitle">상품사이즈</div>
                    {size.map((itemV) => {
                        return (
                            <label key={itemV}>
                                <input
                                    type="checkbox"
                                    name="csType"
                                    value={itemV}
                                    className="cb"
                                    onChange={handleCheckboxChange}
                                    />
                                {itemV}
                            </label>
                        );
                    })}

                    <hr/>
                    <div id="ccCsInputContainer" className="productColumnTitle">
                    <div className="productColumnTitle">색상별 사이즈 재고량</div>
                        {selectedCcTypes.length > 0 &&
                            selectedCsTypes.length > 0 &&
                            selectedCcTypes.flatMap((ccType) =>
                                selectedCsTypes.map((csType) => (
                                    <>
                                        <div className="cxsTitle">
                                            {ccType},{csType} 수량
                                        </div>
                                        <input
                                            type="number"
                                            name={`${ccType}-${csType}`}
                                            placeholder="수량기재"
                                            />
                                    </>
                                ))
                                )}
                    </div>
                    <hr/>

                    <div className="productColumnTitle">상품대분류</div>
                    {top.map((itemV) => {
                        return (
                            <label key={itemV.ctGrp}>
                                <input
                                    type="radio"
                                    name="ctGrp"
                                    value={itemV.ctGrp}
                                    className="cb"
                                />
                                {itemV.ctValMean}
                            </label>
                        );
                    })}
                    <hr/>

                    <div className="productColumnTitle">상품중분류</div>
                    {mid.map((itemV) => {
                        return (
                            <label key={itemV.cmGrp}>
                                <input
                                    type="radio"
                                    name="cmGrp"
                                    value={itemV.cmGrp}
                                    className="cb"
                                    />
                                {itemV.cmValMean}
                            </label>
                        );
                    })}
                    <hr/>

                    <div className="productColumnTitle">상품구성 확인리스트</div>
                    <div id="ccCsTextContainer">
                        {selectedCcTypes.map((ccType) =>
                            selectedCsTypes.map((csType) => (
                                <div key={`${ccType}-${csType}`}>
                                    {ccType},{csType}
                                </div>
                            ))
                            )}
                    </div>

                    <button type="submit" className="productEditSubmit">
                        상품추가하기
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProductCreate;
