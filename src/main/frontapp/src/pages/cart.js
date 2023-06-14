import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
    Box,
    Typography,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

import "../styles/cart.scss";
export default Cart;
function Cart() {
    return (
        <>
            <Container component="main" maxWidth="xl" className="cartContainer">
                <Box className="cartBox">
                    <Typography className="title">
                        <strong>CART</strong>
                    </Typography>
                </Box>
                <TableCart />
            </Container>
        </>
    );

    //=======================================================================
    //============================= 소수점 표시 =============================
    //=======================================================================

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

    //=======================================================================
    //================================ TableCart ============================
    //=======================================================================

    function TableCart() {
        const [data, setData] = useState(EditCartData);
        const [checkedRows, setCheckedRows] = useState([]);

        const handleCheckboxChange = (event, index) => {
            if (event.target.checked) {
                // 체크된 경우 checkedRows 배열에 index 추가
                setCheckedRows([...checkedRows, index]);
            } else {
                // 체크 해제된 경우 checkedRows 배열에서 해당 index 삭제
                setCheckedRows(checkedRows.filter((row) => row !== index));
            }
        };

        //전체 체크박스 체크 및 해제
        const handleSelectAll = (event) => {
            if (event.target.checked) {
                // 전체 체크박스가 체크되면 모든 항목을 체크
                setCheckedRows(
                    Array.from({ length: EditCartData.length }, (_, i) => i)
                );
            } else {
                // 전체 체크박스가 체크 해제되면 모든 항목을 체크 해제
                setCheckedRows([]);
            } // 나머지 체크박스들을 체크 또는 해제
            const checkboxes = document.querySelectorAll(
                'input[type="checkbox"]'
            );
            checkboxes.forEach((checkbox) => {
                if (checkbox !== event.target) {
                    checkbox.checked = event.target.checked;
                }
            });
        };

        //증가 감소
        const handleIncrement = (index) => {
            // +1 증가 로직
            const newData = [...data];
            newData[index].ea += 1;
            newData[index].price =
                EditCartData[index].ea * userCartData[index].price;
            // newData[index].point =
            //   EditCartData[index].ea * userCartData[index].price * 0.01;
            newData[index].sum =
                EditCartData[index].ea * userCartData[index].price;
            setData(newData);
        };

        const handleDecrement = (index) => {
            // -1 감소 로직
            const newData = [...data];
            if (newData[index].ea <= 1) {
                alert("수량은 최소 1개 이상 필요합니다.");
            } else {
                newData[index].ea -= 1;
                newData[index].price =
                    EditCartData[index].ea * userCartData[index].price;
                // newData[index].point =
                //   EditCartData[index].ea * userCartData[index].price * 0.01;
                newData[index].sum =
                    EditCartData[index].ea * userCartData[index].price;
                setData(newData);
            }
        };

        const thTitlesExceptInfo = [
            { title: "컬러" },
            { title: "사이즈" },
            { title: "수량" },
            { title: "상품금액" },
            { title: "합계금액" },
        ];

        return (
            <Container className="cartContainer">
                <TableContainer component={Paper} className="cartTable">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" className="chkhd">
                                    <input
                                        type="checkbox"
                                        className="selectAll"
                                        onChange={handleSelectAll}
                                        checked={
                                            checkedRows.length ===
                                                EditCartData.length &&
                                            EditCartData.length !== 0
                                        }
                                    />
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className="tableHead"
                                    colSpan={2}
                                >
                                    상품/옵션 정보
                                </TableCell>
                                {thTitlesExceptInfo.map((obj, idx) => (
                                    <TableCell
                                        key={idx}
                                        align="center"
                                        className="tableHead"
                                    >
                                        {obj.title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {EditCartData.map((row, index) => (
                                <TableRow key={row.iteminfo}>
                                    <TableCell className="tableCell">
                                        <input
                                            type="checkbox"
                                            className="select"
                                            onChange={(event) =>
                                                handleCheckboxChange(
                                                    event,
                                                    index
                                                )
                                            }
                                        />
                                    </TableCell>
                                    <TableCell
                                        className="tableCell"
                                        align="left"
                                    >
                                        <Link to={row.detailUrl}>
                                            <img
                                                className="cartImg"
                                                src={row.imgSrc}
                                                alt={`item${index + 1}`}
                                            />
                                        </Link>
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="tableCell"
                                    >
                                        <Link to={row.detailUrl}>
                                            {row.iteminfo}
                                        </Link>
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="tableCell"
                                    >
                                        {row.color}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="tableCell"
                                    >
                                        <Link to={row.detailUrl}>
                                            {row.size}
                                        </Link>
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="tableCell bold"
                                    >
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                handleDecrement(index)
                                            }
                                        >
                                            &lt;
                                        </button>
                                        {row.ea}개
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                handleIncrement(index)
                                            }
                                        >
                                            &gt;
                                        </button>
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="tableCell"
                                    >
                                        {makeDot(row.price)}원
                                    </TableCell>
                                    {/* <TableCell align="center" className="tableCell">
                    {row.point}p
                  </TableCell> */}
                                    <TableCell
                                        align="center"
                                        className="tableCell bold"
                                    >
                                        {makeDot(row.sum)}원
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <SumCart data={data} checkedRows={checkedRows} />
            </Container>
        );
    }

    //=======================================================================
    //================================ SumCart ==============================
    //=======================================================================
    function SumCart({ data, checkedRows }) {
        // 체크된 row의 합계 구하기
        const checkedRowsSum = {
            ea: 0,
            price: 0,
            // point: 0,
        };
        checkedRows.forEach((index) => {
            const row = data[index];
            checkedRowsSum.ea += parseInt(row.ea);
            checkedRowsSum.price += parseInt(row.price);
            // checkedRowsSum.point += parseInt(row.point);
        });

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

        const [redirect, setRedirect] = useState(false);

        const purchaseChk = () => {
            if (checkedRowsSum.ea < 1) {
                alert("상품을 1개 이상 선택해야 결제가 진행됩니다.");
                return false;
            }
            return true;
        };

        const sumCartThTitles = [
            { title: "총 상품개수" },
            { title: "배송비" },
            { title: "총 합계" },
        ];

        return (
            <>
                <TableContainer component={Paper} className="briefTable">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {sumCartThTitles.map((obj) => (
                                    <TableCell
                                        align="center"
                                        className="breifHead"
                                    >
                                        {obj.title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" className="tableCell">
                                    {makeDot(checkedRowsSum.ea)}개
                                </TableCell>
                                {/* <TableCell align="center" className="tableCell">
                  {makeDot(checkedRowsSum.point)}p
                </TableCell> */}
                                <TableCell align="center" className="tableCell">
                                    무료배송
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className="tableCell bold"
                                >
                                    {makeDot(checkedRowsSum.price)}원
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <button
                    onClick={() => setRedirect(purchaseChk())}
                    className="purchase"
                >
                    결제하기
                </button>
                {redirect && <Navigate to="/purchase" replace />}
            </>
        );
    }
}

//==== cart 임시 데이터 객체배열
const pureCartData = [
    {
        id: 1,
        imgSrc: require("../image/menwear1.jpg"),
        iteminfo: "남자옷1",
        ea: 1,
        price: 50000,
        detailUrl: "/",
        color: "그레이",
        size: "FREE",
    },
    {
        id: 2,
        imgSrc: require("../image/menwear2.jpg"),
        iteminfo: "남자옷2",
        ea: 1,
        price: 12000,
        detailUrl: "/",
        color: "네이비",
        size: "L",
    },
    {
        id: 3,
        imgSrc: require("../image/menwear3.jpg"),
        iteminfo: "남자옷3",
        ea: 1,
        price: 38000,
        detailUrl: "/",
        color: "차콜",
        size: "XL",
    },
    {
        id: 4,
        imgSrc: require("../image/menwear4.jpg"),
        iteminfo: "남자옷4",
        ea: 1,
        price: 50000,
        detailUrl: "/",
        color: "베이지",
        size: "FREE",
    },
    {
        id: 5,
        imgSrc: require("../image/menwear5.jpg"),
        iteminfo: "남자옷5",
        ea: 1,
        price: 17000,
        detailUrl: "/",
        color: "화이트",
        size: "L",
    },
];

const userCartData = pureCartData.map((item) => {
    const sum = item.ea * item.price;
    // const point = item.ea * item.price * 0.01;
    return {
        ...item,
        sum,
        // point,
    };
});

//원본 DefaultRows 데이터와 수정가능한 newRows 데이터

const EditCartData = userCartData.map((row) => {
    const EditCartData = Object.assign({}, row); // 객체 복사
    return EditCartData;
});
