import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function MpMyInfo({ checkLogin }) {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const newPassword = data.get("userPw");
        const newName = data.get("userName");
        const newGender = data.get("userGender");
        const newPhone = data.get("userPhone");

        try {
            const memberNewData = {
                userPw: newPassword,
                userName: newName,
                userGender: newGender,
                userPhone: newPhone,
            };

            axios
                .put("/member/update/" + `${checkLogin.userIdx}`, memberNewData)
                .then((response) => {
                    if (response.status === 200) {
                        alert("회원정보가 성공적으로 변경되었습니다.");
                        navigate("/mypage/myinfo");
                    }
                })
                .catch(() => {
                    alert("회원정보 변경이 실패하였습니다.");
                });
        } catch {
            alert("뭔가 이상합니데이");
        }
    };

    return (
        <div className="myInfo">
            <div className="myInfoTitle">회원정보 수정</div>
            <hr />
            <div className="myInfoBox">
                <form method="post" className="myInfoForm" onSubmit={handleSubmit}>
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
