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
        .get('/category')
        .then((result) => {
            setSize(result.data.csType);
            setColor(result.data.ccType.map((ccType, index) =>({
                ccType: ccType,
                ccValMean: result.data.ccValMean[index],
            })));
            setTop(result.data.ctGrp.map((ctGrp, index)=> ({
                ctGrp: ctGrp,
                ctValMean: result.data.ctValMean[index],
            })));
            setMid(result.data.cmGrp.map((cmGrp, index)=>({
                cmGrp: cmGrp,
                cmValMean: result.data.cmValMean[index],
            })));
            setGender(result.data.genderCode.map((genderCode, index) => ({
                genderCode: genderCode,
                genderMean: result.data.genderMean[index],
            })));
        })
        .catch((err)=> {
            console.log(err);
        })
    }, [])
    



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData(e.currentTarget);

        const productData = {
            productName: data.get("productName"),
            genderCode: data.get("genderCode"),
            productPrice: data.get("productPrice"),
            ccType: Array.from(data.getAll("ccType")).toString(),
            csType: Array.from(data.getAll("csType")).toString(),
            // productStock: data.get("productStock"),
            ctGrp: data.get("ctGrp"),
            cmGrp: data.get("cmGrp"),
            productEnroll: paresDate(),
        };

        console.log(productData);
        

        axios
            .post("/product/create", productData)
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
                >
                    {/* <div className="productColumnTitle">
                        상품 썸네일 링크주소
                    </div>
                    <input type="file" name="productThumUrl" /> */}

                    <div className="productColumnTitle">상품명</div>
                    <input type="text" name="productName" />

                    <div className="productColumnTitle">상품성별구분</div>
                    {gender.map((itemV) => {
                            return(
                                <label><input type ="radio" name="genderCode" value={itemV.genderCode}/>{itemV.genderMean}</label>
                            );
                        })}
                    <div className="productColumnTitle">상품가격</div>
                    <input type="text" name="productPrice" />

                    <div className="productColumnTitle">상품색상</div>
                        {color.map((itemV) => {
                            return(
                                <label><input type ="checkbox" name="ccType" value={itemV.ccType}/>{itemV.ccValMean}</label>
                            );
                        })}

                    <div className="productColumnTitle">상품사이즈</div>
                    {size.map((itemV) => {
                            return(
                                <label><input type ="checkbox" name="csType" value={itemV}/>{itemV}</label>
                            );
                        })}

                    {/* <div className="productColumnTitle">상품재고량</div>
                    <input type="number" name="productStock" /> */}

                    <div className="productColumnTitle">상품대분류</div>
                    {top.map((itemV) => {
                            return(
                                <label><input type ="radio" name="ctGrp" value={itemV.ctGrp}/>{itemV.ctValMean}</label>
                            );
                        })}
                    {/* <select name="ctGrp" defaultValue="n">
                        <option value="n">NEW</option>
                        <option value="s">SALE</option>
                        <option value="b">BEST</option>
                        <option value="m">MENS</option>
                        <option value="l">LADIES</option>
                    </select> */}

                    <div className="productColumnTitle">상품중분류</div>
                    {mid.map((itemV) => {
                            return(
                                <label><input type ="radio" name="cmGrp" value={itemV.cmGrp}/>{itemV.cmValMean}</label>
                            );
                        })}
                    {/* <select name="cmGrp" defaultValue="n">
                        <option value="n">아우터</option>
                        <option value="s">원피스</option>
                        <option value="b">자켓</option>
                        <option value="m">바지</option>
                        <option value="l">스커트</option>
                        <option value="l">양말</option>
                    </select> */}

                    {/* <div className="productColumnTitle">상품상세이미지</div>
                    <input
                        type="file"
                        name="productDetail"
                        multiple
                    /> */}

                    <button className="editProductBtn" type="submit">
                        제출
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProductCreate;
