import { Route, Routes, Outlet, Link } from "react-router-dom";
import WishList from "../components/mypage/wishList/wishList";
import RecentList from "../components/mypage/recentList/recentList";
import "../styles/mypage.scss";
import { useState, useEffect } from "react";
import Newpost from "../components/mypage/Newpost";
import { MpQnA } from "../components/mypage/MpQnA";
import MpMyInfo from "../components/mypage/MpMyInfo";
import axios from "axios";
export default function Mypage({ checkLogin, setCheckLogin }) {
    const [page, setPage] = useState("qna");
    //-------------- 세션 정보 가져오기 ------------
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (checkLogin) {
            fetchUserInfo();
        }
    }, [checkLogin]);

    async function fetchUserInfo() {
        try {
            const response = await axios.get("/member/session");
            const data = response.data;
            setUserInfo(data);
        } catch (error) {
            console.log(error);
        }
    }

    //--------------사이드 서브메뉴 구성 ------------
    const sideMenu_orderPages = [
        { id: 1, title: "주문/배송 조회", url: "/" },
        { id: 2, title: "위시리스트", url: "/mypage/wishlist" },
    ];

    const sideMenu_askPages = [
        { id: 1, title: "1:1문의 내역", url: "/mypage/myqna" },
        { id: 2, title: "리뷰작성 내역", url: "/mypage/myreview" },
    ];

    const sideMenu_myInfo = [
        { id: 1, title: "회원정보 수정", url: "/mypage/myinfo" },
    ];

    //마이페이지 HTML 구성

    return (
        <div className="mpContainer">
            <Sidemenu />
            <div className="myBoard">
                <Routes>
                    <Route path="/main" element={<MpMain />} />
                    <Route
                        path="/myqna/*"
                        element={
                            <MpQnA
                                page={page}
                                setPage={setPage}
                                checkLogin={checkLogin}
                            />
                        }
                    />
                    <Route
                        path="/newpost"
                        element={
                            <Newpost
                                checkLogin={checkLogin}
                                page={page}
                                setPage={setPage}
                            />
                        }
                    />
                    <Route path="/myreview" element={<MpMyReview />} />
                    <Route
                        path="/myinfo"
                        element={
                            <MpMyInfo
                                userInfo={userInfo}
                                setUserInfo={setUserInfo}
                                setCheckLogin={setCheckLogin}
                            />
                        }
                    />
                </Routes>
                <Outlet />
            </div>
        </div>
    );

    //=======================================================================
    //============================ SideMenu =================================
    //=======================================================================
    function Sidemenu() {
        return (
            <>
                <div className="myListContainer">
                    <div className="myList">
                        <ul className="hello">
                            <Link to="/mypage/main">
                                <strong>마이페이지</strong>
                            </Link>
                            <li>
                                <b>{userInfo.userName}</b>님 안녕하세요
                            </li>
                        </ul>
                        <ul className="myOrder">
                            <li className="sideMtitle">주문 관련</li>
                            {sideMenu_orderPages.map((obj) => {
                                return (
                                    <li key={obj.id} className="list">
                                        <Link to={obj.url}>{obj.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <ul className="myQnaReview">
                            <li className="sideMtitle">문의/리뷰</li>
                            {sideMenu_askPages.map((obj) => {
                                return (
                                    <li key={obj.id} className="list">
                                        <Link to={obj.url}>{obj.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <ul className="myInfo">
                            <li className="sideMtitle">나의 정보</li>
                            {sideMenu_myInfo.map((obj) => {
                                return (
                                    <li key={obj.id} className="list">
                                        <Link to={obj.url}>{obj.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </>
        );
    } // Sidemenu

    //=======================================================================
    //================== MpMain 및 하위 컴포넌트 함수 모음 ==================
    //=======================================================================

    function MpMain() {
        return (
            <>
                <StatusBox />
                <OrderFlow />
                <RecentList mockListData={mockListData} />
                <WishList mockListData={mockListData} />
            </>
        );
    } // MpMain

    //================== MpMain 하위 StatusBox

    function StatusBox() {
        return (
            <>
                <ul className="statusBox">
                    <li className="box">
                        <p>{statusData.request}</p>
                        <p>문의</p>
                    </li>
                    <li className="box">
                        <p>{statusData.wish}</p>
                        <p>위시리스트</p>
                    </li>
                </ul>
            </>
        );
    } // StatusBox

    //================== MpMain 하위 OrderFlow

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
                                <span className="circle">
                                    {orderData.purchase}
                                </span>
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
                                <span className="circle">
                                    {orderData.ready}
                                </span>
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
                                <span className="circle">
                                    {orderData.delivery}
                                </span>
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
                                <span className="circle">
                                    {orderData.arrived}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </>
        );
    } // OrderFlow

    function MpMyReview() {
        return (
            <>
                <div>MyReview Test</div>
                <div>MyReview Test</div>
                <div>MyReview Test</div>
            </>
        );
    } // MpMyReview
} // main function

//--------------내 쿠폰, 포인트, 문의, 위시 ----
const statusData = {
    coupon: 3,
    point: 36500,
    request: 1,
    wish: 4,
};

//---------------내 주문상황 -----------------
const orderData = {
    purchase: 0,
    ready: 1,
    delivery: 2,
    arrived: 1,
};

//--------------- 내 최근, 위시리스트 상품목록 ------

const mockListData = [
    {
        id: 1,
        title: "남자옷1",
        PercentS: "30%",
        basicP: 300000,
        saleP: 210000,
        link: "/detail",
    },
    {
        id: 2,
        title: "남자옷2",
        PercentS: "30%",
        basicP: 300000,
        saleP: 210000,
        link: "/detail",
    },
    {
        id: 3,
        title: "남자옷3",
        PercentS: "30%",
        basicP: 300000,
        saleP: 210000,
        link: "/detail",
    },
    {
        id: 4,
        title: "남자옷4",
        PercentS: "30%",
        basicP: 300000,
        saleP: 210000,
        link: "/detail",
    },
    {
        id: 5,
        title: "남자옷5",
        PercentS: "30%",
        basicP: 300000,
        saleP: 210000,
        link: "/detail",
    },
    {
        id: 6,
        title: "남자옷6",
        PercentS: "30%",
        basicP: 300000,
        saleP: 210000,
        link: "/detail",
    },
    {
        id: 7,
        title: "남자옷7",
        PercentS: "30%",
        basicP: 300000,
        saleP: 210000,
        link: "/detail",
    },
    {
        id: 8,
        title: "남자옷8",
        PercentS: "30%",
        basicP: 300000,
        saleP: 210000,
        link: "/detail",
    },
];
