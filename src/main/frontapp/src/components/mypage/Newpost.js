import { useState } from "react";
import { TYPEOFINQUIRY } from "../../constants/constOfMypage";
import { BoardHeader } from "./BoardHeader";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { paresDate } from "../../utils/parseDate";

export default function Newpost({ checkLogin, page, setPage }) {
    const boardTitle = "문의 입력";
    const btnText = "문의 내역";
    const [typeOfInquiry, setTypeOfInquiry] = useState(false);
    const [title, setTitleValue] = useState('');
    const [content, setContentValue] = useState('');
    const navigate = useNavigate();

    function validateData() {
        const getTitle = document.getElementsByClassName('titleOfQuestion');

        if (!typeOfInquiry) {
            alert("문의 유형을 선택해주세요.");
            getTitle[0].focus();
            return;
        }

        if (!title) {
            getTitle[3].focus();
            alert("제목을 입력 하세요.");
            return;
        }

        if (!content) {
            getTitle[4].focus();
            alert("내용을 입력 하세요.");
            return;
        }

        if (window.confirm("게시글을 등록 하시겠습니까?")) {
            try {
                axios
                    .post('/mypage/createpost', {
                        type_of_inquiry: typeOfInquiry,
                        userName: checkLogin.userName,
                        userEmail: checkLogin.userEmail,
                        title: title,
                        content: content,
                        date: paresDate(),
                        response: false,
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            alert('게시물을 등록하였습니다.')
                            navigate('/mypage/myqna');
                        }
                    })
            } catch (e) {
                alert("게시물 등록에 실패했습니다.")
            }

        }

    }

    function checkCancel() {
        if (window.confirm("작성중인 게시물을 삭제하고 돌아가시겠습니까?")) {
            navigate("/mypage/myqna");
        } else {
            return;
        }
    }

    return (
        <>
            <BoardHeader boardTitle={boardTitle} btnText={btnText} page={page} setPage={setPage} />
            <div className="inquiryForm">
                <table>
                    <tbody>
                        <tr>
                            <span className="titleOfQuestion">문의 유형</span>
                            <td>
                                {
                                    TYPEOFINQUIRY.map(i => {
                                        return (
                                            <span>
                                                <input className="checkType" type="radio" name="typeOfInquiry" id={i.value} value={i.value} onClick={() => setTypeOfInquiry(i.value)} />
                                                <label htmlFor={i.value} onClick={() => setTypeOfInquiry(i.value)} >{i.text}</label>
                                            </span>
                                        )
                                    })
                                }
                            </td>
                        </tr>
                        <tr>
                            <span className="titleOfQuestion">ID</span>
                            <td>
                                <input type="text" name="userEmail" value={checkLogin.userEmail} style={{ border: 'none' }} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <span className="titleOfQuestion">고객명</span>
                            <td>
                                <input type="text" name="userName" value={checkLogin.userName} style={{ border: 'none' }} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <span className="titleOfQuestion">제목</span>
                            <td>
                                <input type="text"
                                    className="textBox question_Input_Title"
                                    name="title"
                                    onChange={(e) => setTitleValue(e.target.value)}
                                    value={title}
                                />
                            </td>
                        </tr>
                        <tr>
                            <span className="titleOfQuestion">내용</span>
                            <td>
                                <input
                                    type="text"
                                    className="textBox question_Input_Content"
                                    name="content"
                                    onChange={(e) => setContentValue(e.target.value)}
                                    value={content}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="validateBtnBox">
                <button onClick={validateData}>등록하기</button>
                <button onClick={checkCancel}>취소하기</button>
            </div>
        </>
    )
}