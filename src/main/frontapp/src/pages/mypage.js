import { Route, Routes, useParams, Outlet, Link } from "react-router-dom";
import WishList from "../components/mypage/wishList/wishList";
import RecentList from "../components/mypage/recentList/recentList";
import "../styles/mypage.scss";
import makeDot from "../utils/makeDot";

export default function Mypage({ checkLogin }) {
  //--------------사이드 서브메뉴 구성 ------------
const sideMenu_orderPages = [
  { id: 1, title: "주문/배송 조회", url: "/" },
  { id: 2, title: "위시리스트", url: "/mypage/wishlist" },
];

const sideMenu_askPages = [
  { id: 1, title: "1:1문의 내역", url: "/mypage/myqna" },
  { id: 2, title: "리뷰작성 내역", url: "/mypage/myreview" },
];

const sideMenu_myInfo = [{ id: 1, title: "회원정보 수정", url: "/" }];

//마이페이지 HTML 구성

  return (
    <div className="mpContainer">
      <Sidemenu />
      <div className="myBoard">
        <Routes>
          <Route path="/main" element={<MpMain />} />
          <Route path="/myqna" element={<MpQnA />} />
          <Route path="/myreview" element={<MpMyReview />} />
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
              <Link to='/mypage/main'>
                <strong>마이페이지</strong>
              </Link>
              <li>
                <b>{checkLogin.userName}</b>님 안녕하세요
              </li>
            </ul>
            <ul className="myOrder">
              <li className="sideMtitle">주문 관련</li>
              {
                sideMenu_orderPages.map((obj) => {
                  return (
                    <li key={obj.id} className="list">
                      <Link to={obj.url}>{obj.title}</Link>
                    </li>
                  );
                })
              }
            </ul>
            <ul className="myQnaReview">
              <li className="sideMtitle">문의/리뷰</li>
              {
                sideMenu_askPages.map((obj) => {
                  return (
                    <li key={obj.id} className="list">
                      <Link to={obj.url}>{obj.title}</Link>
                    </li>
                  );
                })
              }
            </ul>
            <ul className="myInfo">
              <li className="sideMtitle">나의 정보</li>
              {
                sideMenu_myInfo.map((obj) => {
                  return (
                    <li key={obj.id} className="list">
                      <Link to={obj.url}>{obj.title}</Link>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>
      </>
    )

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
          <li className="box"><p>{statusData.request}</p><p>문의</p></li>
          <li className="box"><p>{statusData.wish}</p><p>위시리스트</p></li>
        </ul>
      </>
    )

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

  } // OrderFlow


  //---------------- <recentList, wishList 상품 임시 데이터, 버튼 이미지>


  //=================================================================
  //=================================================================
  //=================================================================

  function MpQnA() {
    //css 필요
    const receiveData = data.filter(i => i.address === checkLogin.address);
    const boardList = ["작성자", "상품명", "작성일", "제목", "내용"];

    if (receiveData.length != 0) {
      return (
        <>
          <div className="qnaBoard">
            <table border="1px">
              <tr className="boardListContainer">
                {
                  boardList.map(i => <td>{i}</td>)
                }
              </tr>

              {
                receiveData.map(i => (
                  <tr className="boardContentContainer">
                    <td>{i.작성자}</td>
                    <td>{i.상품명}</td>
                    <td>{i.date}</td>
                    <td>{i.title}</td>
                    <td>{i.content}</td>
                  </tr>
                ))
              }
            </table>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>문의하신 내역이 없습니다.</div>
        </>
      )
    }

  } // MpQnA

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

const data = [
  // {
  //   작성자: "이학로",
  //   상품명: "test1",
  //   date: "2023.05.10",
  //   title: "제목 테스트",
  //   content: "내용 테스트",
  //   address: "hakro125@gmail.com",
  // },
  // {
  //   작성자: "이학로",
  //   상품명: "test2",
  //   date: "2023.05.29",
  //   title: "제목 테스트",
  //   content: "내용 테스트",
  //   address: "hakro125@gmail.com",
  // }
]

//--------------내 쿠폰, 포인트, 문의, 위시 ----
const statusData =
{
  coupon: 3,
  point: 36500,
  request: 1,
  wish: 4,
}

//---------------내 주문상황 -----------------
const orderData =
{
  purchase: 0,
  ready: 1,
  delivery: 2,
  arrived: 1,
}

//--------------- 내 최근, 위시리스트 상품목록 ------

const mockListData = [
  { id: 1, title: "남자옷1", PercentS: "30%", basicP: 300000, saleP: 210000, link: "/detail", },
  { id: 2, title: "남자옷2", PercentS: "30%", basicP: 300000, saleP: 210000, link: "/detail", },
  { id: 3, title: "남자옷3", PercentS: "30%", basicP: 300000, saleP: 210000, link: "/detail", },
  { id: 4, title: "남자옷4", PercentS: "30%", basicP: 300000, saleP: 210000, link: "/detail", },
  { id: 5, title: "남자옷5", PercentS: "30%", basicP: 300000, saleP: 210000, link: "/detail", },
  { id: 6, title: "남자옷6", PercentS: "30%", basicP: 300000, saleP: 210000, link: "/detail", },
  { id: 7, title: "남자옷7", PercentS: "30%", basicP: 300000, saleP: 210000, link: "/detail", },
  { id: 8, title: "남자옷8", PercentS: "30%", basicP: 300000, saleP: 210000, link: "/detail", },
];
