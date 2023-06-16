import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function MpMyInfo({ checkLogin, setCheckLogin }) {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const newPassword = data.get("userPw");
        const newName = data.get("userName");
        const newGender = data.get("userGender");
        const newPhone = data.get("userPhone");

        const pwValidation = (password) => {
            const pwRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()?!])[A-Za-z\d@#$%^&*()?!]{8,}$/;

            if (!password) {
                console.log("pwValidateion 은 공백을 기존세션 userPw로 반환");
                return true;
            } else {
                return pwRegex.test(password);
            }
        };

        const pnValidation = (phoneNumber) => {
            let hasNonNumeric = false; // 문자가 발견되었는지를 나타내는 변수
            phoneNumber.split("").forEach((char) => {
                if (isNaN(char)) {
                    // 입력받은 값이 숫자가 아닌 경우
                    hasNonNumeric = true; // 문자가 발견되었음을 표시
                }
            });
            if (hasNonNumeric || phoneNumber.length !== 11) {
                // 문자가 발견되었거나 숫자가 11개가 아닐 경우
                return false; // false 반환
            }
            return true; // 숫자가 11개일 경우
        };

        //======================================
        // 변경사항이 없는지 확인
        if (
            !newPassword &&
            newName === checkLogin.userName &&
            newGender === checkLogin.userGender &&
            newPhone === checkLogin.userPhone
        ) {
            alert("변경사항이 없습니다!");
            return;
        }

        //======================================
        // 변경사항이 있다면
        if (!pwValidation(newPassword)) {
            alert(
                "비밀번호는 숫자와 영문 대소문자와 특수문자(@$!%*?&)포함 8자 이상이어야 합니다."
            );
            return;
        } else if (!pnValidation(newPhone)) {
            alert("유효하지 않은 휴대번호입니다.");
            return;
        } else if (!newName) {
            alert("성함을 입력하세요.");
            return;
        } else {
            try {
                const memberNewData = {
                    userPw: newPassword,
                    userName: newName,
                    userGender: newGender,
                    userPhone: newPhone,
                };
                axios
                    .put(
                        "/member/update/" + `${checkLogin.userIdx}`,
                        memberNewData
                    )
                    .then((response) => {
                        if (response.status === 200) {
                            alert(
                                "회원정보가 성공적으로 변경되었습니다.\n 재로그인 해주세요"
                            );
                            sessionStorage.clear();
                            navigate("/");
                            setCheckLogin(false);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        alert("회원정보 변경이 실패하였습니다.");
                    });
            } catch {
                alert("뭔가 이상합니데이");
            }
        }
    };

    return (
        <div className="myInfo">
            <div className="myInfoTitle">회원정보 수정</div>
            <hr />
            <div className="myInfoBox">
                <form
                    method="post"
                    className="myInfoForm"
                    onSubmit={handleSubmit}
                >
                    <div>이메일</div>
                    <input
                        type="email"
                        name="userEmail"
                        value={checkLogin.userEmail}
                        disabled
                    />
                    <div>신규 비밀번호 수정</div>
                    <input
                        type="password"
                        name="userPw"
                        placeholder="숫자와 영문 대소문자와 특수문자(@$!%*?&)포함 8자 이상"
                        autoComplete="current-password"
                    />
                    <div>이름</div>
                    <input
                        type="text"
                        name="userName"
                        defaultValue={checkLogin.userName}
                    />
                    <div>성별</div>
                    <select
                        name="userGender"
                        defaultValue={checkLogin.userGender}
                    >
                        {checkLogin.userGender === "m" ? (
                            <>
                                <option value="m">남자</option>
                                <option value="f">여자</option>
                            </>
                        ) : (
                            <>
                                <option value="f">여자</option>
                                <option value="m">남자</option>
                            </>
                        )}
                    </select>
                    <div>전화번호</div>
                    <input
                        type="text"
                        name="userPhone"
                        defaultValue={checkLogin.userPhone}
                    />
                    <div>
                        <button type="submit">제출</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MpMyInfo;
