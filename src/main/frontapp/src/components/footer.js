import "../styles/footer.scss";
// import FooterIcon from './footerIcon';
import { Link } from "react-router-dom";
function Footer() {
    return (
        <>
            <footer>
                <div className="footerContainer">
                    <div className="footer_top">
                        <div className="footer_logo">
                            {/* 라우터 사용 */}
                            <Link to={"/"}>
                                <img
                                    src={require("../image/clojet_logo_final_black.png")}
                                    alt="하단 로고 이미지"
                                />
                            </Link>
                        </div>

                        <div className="footer_icon">
                            <ul>
                                <li>
                                    <a href="/">
                                        <img
                                            src={require("../image/f-icon.png")}
                                            alt="페이스북"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <img
                                            src={require("../image/i-icon.png")}
                                            alt="인스타그램"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <img
                                            src={require("../image/y-icon.png")}
                                            alt="유튜브"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer_line"></div>

                    <div className="footer_bottom">
                        <div className="b_left">
                            <div className="link">
                                {/* 라우터 사용*/}
                                <Link to={"/"}>고객센터</Link>
                                <Link to={"/"}>개인정보처리방침</Link>
                                <Link to={"/"}>이용약관</Link>
                            </div>
                            <div className="info">
                                <span>상호명 : CLOJET </span>
                                <br />
                                <span>대표명 : 팀제이 </span>
                                <br />
                                <span>
                                    주소 : 경기도 성남시 분당구 돌마로 46 5층
                                    그린컴퓨터아카데미 성남분당점
                                </span>
                                <br />
                                <span>사업자등록번호 : 1234 - 5678</span>
                                <span>통신판매업신고번호 : 12345 - 67890</span>
                                <p>
                                    copyright&#x24D2; 2021 MANDARINA DUCK. all
                                    rights reserved. hosting by
                                    &#xC5D4;&#xC5D0;&#xC774;&#xCE58;&#xC5D4;&#xCEE4;&#xBA38;&#xC2A4;(&#xC8FC;).
                                    design by
                                    &#xB514;&#xC790;&#xC778;&#xC704;&#xBE0C;.
                                </p>
                            </div>
                        </div>

                        <div className="b_right">
                            <div className="help">
                                <p>HELP DESK</p>
                                <p>010 - 7577 - 8029</p>
                                <p>평일 AM 9:00 ~ PM 6:10</p>
                                <p>점심 PM 1:20 ~ PM 2:10</p>
                                <p>휴무 연중무휴</p>
                            </div>
                            <div className="as">
                                <p>A/S</p>
                                <p>A/S 실시간 문의 연락처</p>
                                <p>P.N : 031-000-0000</p>
                                <p>KakaoTalk Channel : CLOJET</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
