import "../styles/header.scss";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default Header;
function Header({ checkLogin, setCheckLogin }) {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
            <header>
                <HeaderBackScroll />
                <HeaderTopDeltaY />
                <HeaderBottom />
                {/* <HeaderBadge /> */}
            </header>
        </>
    );

    //=======================================================================
    //=========================== HeaderBackScroll ==========================
    //=======================================================================

    function HeaderBackScroll() {
        const btnRef = useRef(null);
        const [scrollY, setScrollY] = useState(0);

        useEffect(() => {
            const handleScroll = () => {
                setScrollY(window.scrollY); // 스크롤 위치를 업데이트
                if (window.scrollY > window.innerHeight / 3) {
                    btnRef.current.style.opacity = "1";
                    btnRef.current.style.visibility = "visible";
                } else {
                    btnRef.current.style.opacity = "0";
                    btnRef.current.style.visibility = "hidden";
                }
            };

            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }, []);

        const scrollToTop = () => {
            const scrolling = setInterval(() => {
                window.scrollBy(0, -80);
                if (window.pageYOffset <= 0) {
                    clearInterval(scrolling);
                    setScrollY(0);
                }
            }, 16);
        };

        return (
            <>
                <div
                    className="btn_scrollBack"
                    ref={btnRef}
                    onClick={scrollToTop}
                    style={{ display: scrollY > 0 ? "block" : "none" }} // 스크롤 위치에 따라 보여지는 스타일을 변경
                >
                    <img
                        src={require("../image/backscroll_img.png")}
                        alt="bckscroll"
                    />
                </div>
            </>
        );
    }

    //=======================================================================
    //========================= HeaderTopDeltaY =============================
    //=======================================================================

    function HeaderTopDeltaY() {
        // 로그인 여부에 따른 TOP 메뉴 링크 워딩 변경
        let topMenu = [
            {
                loginOut: checkLogin ? "LOGOUT" : "LOGIN",
                src: checkLogin ? "/" : "/login",
            },
            {
                loginOut: checkLogin ? "고객센터" : "SIGN-UP",
                src: checkLogin ? "/" : "/signup",
            },
        ];
        //-----------------------------------------------

        const header_top = useRef(null);
        const header_inner_ul = useRef(null);
        const header_top_comment = useRef();
        const navigate = useNavigate();
        const navigateToMain = () => {
            navigate("/");
        };

        useEffect(() => {
            window.addEventListener("wheel", handleWheel);
            return () => {
                window.removeEventListener("wheel", handleWheel);
            };
        }, []);

        const handleWheel = (e) => {
            if (e.target.closest(".agreeterm")) return;
            let wheel = e.deltaY;
            if (wheel > 0) {
                header_top.current.style.visibility = "hidden";
                header_top.current.style.height = "0px";
                header_top.current.style.padding = "0px";
                header_inner_ul.current.style.display = "none";
            } else {
                header_top.current.style.visibility = "visible";
                header_top.current.style.height = "30px";
                header_top.current.style.padding = "5px 0";
                header_inner_ul.current.style.display = "block";
            }
        };

        return (
            <>
                <div className="headerTopContainer">
                    <div className="top" ref={header_top}>
                        <div className="comment" ref={header_top_comment}>
                            클로젯 공식 온라인 스토어
                        </div>
                        <ul
                            className="inner_submenu_right"
                            ref={header_inner_ul}
                        >
                            {topMenu.map((e, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            to={e.src}
                                            onClick={() => {
                                                if (checkLogin) {
                                                    alert(
                                                        "로그아웃 하시겠습니까?"
                                                    );
                                                    sessionStorage.clear();
                                                    setCheckLogin(false);
                                                    navigateToMain();
                                                }
                                            }}
                                        >
                                            {" "}
                                            {e.loginOut}{" "}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </>
        );
    }

    //=======================================================================
    //============================ HeaderBottom =============================
    //=======================================================================

    function HeaderBottom() {
        let botMenu = [
            {
                loginOut: "shopping_cart",
                src: checkLogin ? "/cart" : "/login",
            },
            {
                loginOut: "person",
                src: checkLogin ? "/mypage/main" : "/login",
            },
        ];

        let menu = [
            { mainmenu: "EVENT", itemListsrc: "/category/event" },
            { mainmenu: "NEW", itemListsrc: "/category/new" },
            { mainmenu: "SALE", itemListsrc: "/category/sale" },
            { mainmenu: "BEST", itemListsrc: "/category/best" },
            { mainmenu: "MENS", itemListsrc: "/category/mens" },
            { mainmenu: "LADIES", itemListsrc: "/category/ladies" },
            { mainmenu: "ACC", itemListsrc: "/category/acc" },
        ];

        //사이드메뉴 호버
        const [hovered, setHovered] = useState(false);
        const hoverIn = () => setHovered(true);
        const hoverOut = () => setHovered(false);

        //사이드 메뉴 열기
        const open = useRef();

        const openSideMenu = (e) => {
            e.preventDefault();
            sideMenu.current.style.left = "0px";
        };

        // 사이드 메뉴 닫기

        const close = useRef();
        const sideMenu = useRef();

        const closeSideMenu = (e) => {
            e.preventDefault();
            sideMenu.current.style.left = "-400px";
        };

        return (
            <>
                <div className="headerBottomContainer">
                    <div className="bottom">
                        <div className="left">
                            <a
                                href="/"
                                className="burger"
                                ref={open}
                                onClick={openSideMenu}
                            >
                                <span className="material-symbols-outlined">
                                    menu{" "}
                                </span>
                            </a>
                            <Link className="logo" to={"/"}>
                                <img
                                    src={require("../image/clojet_logo_final_black.png")}
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className="center">
                            <ul>
                                {menu.map((e, index) => {
                                    return (
                                        <li key={index}>
                                            <Link to={e.itemListsrc}>
                                                {e.mainmenu}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                            <Link className="logo_hidden" to={"/"}>
                                <img
                                    src={require("../image/clojet_logo_final_black.png")}
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className="right">
                            <ul>
                                <HeaderSearch />
                                {botMenu.map((obj, index) => {
                                    return (
                                        <li key={index}>
                                            <Link to={obj.src}>
                                                <span className="material-symbols-outlined">
                                                    {obj.loginOut}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="sideMenu" ref={sideMenu}>
                    <a
                        href="/"
                        className="close_Side"
                        ref={close}
                        onClick={closeSideMenu}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </a>
                    <ul>
                        {menu.map((e, index) => {
                            return (
                                <li key={index}>
                                    {/* href 를 안 쓰고 클릭했을시 사이드메뉴 없어지고 이동하는 방안 강구 필요 */}
                                    <a
                                        href={e.itemListsrc}
                                        onMouseEnter={hoverIn}
                                        onMouseLeave={hoverOut}
                                    >
                                        {e.mainmenu}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <style>
                    {`
        .sideMenu ul li a:hover::after {
            width: ${hovered ? "100%" : "0%"};
            transition: width 0.3s ease-in-out;
        }
        `}
                </style>
            </>
        );
    }

    //=======================================================================
    //============================ HeaderSearch =============================
    //=======================================================================

    function HeaderSearch() {
        const searchIcon = useRef();
        const searchInput = useRef();
        let clickCnt = 0;

        const inputShow = (e) => {
            e.preventDefault();
            clickCnt++;
            if (window.innerWidth <= 768) {
                searchInput.current.style.opacity = "1";
                searchInput.current.style.visibility = "visible";
                searchInput.current.style.width = "50px";
                searchInput.current.placeholder = "검색";
            } else {
                searchInput.current.style.opacity = "1";
                searchInput.current.style.visibility = "visible";
                searchInput.current.style.width = "180px";
                searchInput.current.placeholder = "검색어를 입력하세요.";
            }

            if (clickCnt % 2 === 0) {
                searchInput.current.style.opacity = "0";
                searchInput.current.style.visibility = "hidden";
                searchInput.current.style.width = "0px";
            }
        };

        return (
            <>
                <li className="search">
                    <input
                        type="text"
                        placeholder="검색어를 입력해주세요."
                        ref={searchInput}
                    />
                    <a href="/">
                        <span
                            className="material-symbols-outlined"
                            ref={searchIcon}
                            onClick={inputShow}
                        >
                            search
                        </span>
                    </a>
                </li>
            </>
        );
    }

    //=======================================================================
    //============================= HeaderBadge =============================
    //=======================================================================

    // function HeaderBadge() {
    //   const badgeRef = useRef(null);

    //   useEffect(() => {
    //     const handleScroll = () => {
    //       if (window.scrollY > window.innerHeight / 3) {
    //         badgeRef.current.style.opacity = "0";
    //         badgeRef.current.style.visibility = "hidden";
    //       } else {
    //         badgeRef.current.style.opacity = "1";
    //         badgeRef.current.style.visibility = "visible";
    //       }
    //     };

    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //       window.removeEventListener("scroll", handleScroll);
    //     };
    //   }, []);

    //   const badgeClose = useRef(null);

    //   const handleClick = (event) => {
    //     if (badgeClose.current.contains(event.target)) {
    //       badgeRef.current.style.display = "none";
    //     }
    //   };

    //   return (
    //     <>
    //       <div className="badges" ref={badgeRef}>
    //         <div className="badge">
    //           <img
    //             className="badgeImg"
    //             src={require("../image/clojet-main-badge1.png")}
    //             alt="Badge"
    //           />
    //           <img
    //             className="close"
    //             src={require("../image/close_button.svg")}
    //             ref={badgeClose}
    //             onClick={handleClick}
    //             alt="close"
    //           />
    //         </div>
    //       </div>
    //     </>
    //   );
    // }
}
