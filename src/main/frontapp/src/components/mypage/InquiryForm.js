import { useState } from "react";
import { TYPEOFINQUIRY } from "../../constants/constOfMypage"
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paresDate } from "../../utils/parseDate";

export default function InquiryForm({ selectData, userInfo }) {
    const [typeOfInquiry, setTypeOfInquiry] = useState(false);
    const [ment, setMent] = useState(selectData ? true : false);
    const [getParam, setParam] = useSearchParams();
    const [title, setTitleValue] = useState(selectData ? selectData[0].title : '');
    const [content, setContentValue] = useState(selectData ? selectData[0].content : '');
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

        if (window.confirm(`게시글을 ${ment ? '수정' : '등록'} 하시겠습니까?`)) {
            try {
                if (!ment) {
                    axios
                        .post('/mypage/createpost', {
                            typeOfInquiry: typeOfInquiry,
                            userName: userInfo.userName,
                            userEmail: userInfo.userEmail,
                            title: title,
                            content: content,
                            date: paresDate(),
                            response: false,
                        })
                        .then((response) => {
                            if (response.status === 200) {
                                alert(`게시물을 등록 하였습니다.`);
                                navigate('/mypage/main');
                            }
                        })
                } else {
                    axios
                        .put('/mypage/updatepost/' + getParam.get('boardSeq'), {
                            typeOfInquiry: typeOfInquiry,
                            userName: userInfo.userName,
                            userEmail: userInfo.userEmail,
                            title: title,
                            content: content,
                            date: paresDate(),
                            response: false,
                        })
                        .then((response) => {
                            if (response.status === 200) {
                                alert(`게시물을 수정 하였습니다.`);
                                navigate('/mypage/main');
                            }
                        })

                }

            } catch (e) {
                alert(`게시물 ${ment ? '수정' : '등록'}에 실패했습니다. 잠시 후 다시 시도해주세요.`)
            }

        }
    }

    function checkCancel() {
        if (window.confirm("돌아가시겠습니까?")) {
            navigate("/mypage/myqna");
        } else {
            return;
        }
    }

    return (
        <>
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
                                <input type="text" name="userEmail" value={userInfo.userEmail} style={{ border: 'none' }} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <span className="titleOfQuestion">고객명</span>
                            <td>
                                <input type="text" name="userName" value={userInfo.userName} style={{ border: 'none' }} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <span className="titleOfQuestion">제목</span>
                            <td>
                                <input type="text"
                                    className="textBox question_Input_Title"
                                    id="question_Input_Title"
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
                                    id="question_Input_Content"
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
                <button onClick={validateData}>{ment ? '수정' : '등록'}하기</button>
                <button onClick={checkCancel}>{ment ? '돌아가기' : '취소하기'}</button>
            </div>
        </>
    )
}