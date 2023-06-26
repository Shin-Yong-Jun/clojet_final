import { useEffect, useState } from "react";
import { BoardHeader } from "./BoardHeader";
import { Link, Route, Routes, redirect, useNavigate, useSearchParams } from "react-router-dom";
import InquiryForm from "./InquiryForm";


export function MpQnA({ page, setPage, userInfo }) {
    const boardList = ["작성자", "제목", "작성일", "삭제"];
    const boardTitle = "1:1 문의 내역";
    const btnText = "문의하기";
    const navigate = useNavigate();
    const [testData, setTestData] = useState([]);
    
    useEffect(() => {
        requestData();
    }, []);
    
    function requestData() {
        const response = new XMLHttpRequest();

        try {
            response.onreadystatechange = function () {
                if (this.readyState === this.DONE) {
                    if (this.status === 200) {
                        setTestData(response.response);
                    }
                }
            };

            response.open(
                "GET",
                `/mypage/myqna/list/${sessionStorage.getItem('checkLogin')}`,
                true
            );

            response.responseType = "json";
            response.setRequestHeader(
                "checkLogin",
                sessionStorage.getItem("checkLogin")
            );

            response.send();
        } catch (error) {
            alert(error);
            redirect('/');
        }

    }


    function ShowMyBoardList() {
        function requestDeletePost(boardSeq) {
            const request = new XMLHttpRequest();

            try {
                request.onreadystatechange = () => {
                    if (request.status === 200) {
                        navigate('/mypage/main');
                    }
                }

                request.open('DELETE', `/mypage/deletepost/${boardSeq}`, true);
                request.setRequestHeader("checkLogin", sessionStorage.getItem("checkLogin"));
                request.send();

            } catch (e) {
                console.log(e);
            }

        }

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
                            testData.map(i => (
                                <Link to={'/mypage/myqna/inquiry?boardSeq=' + i.boardSeq}>
                                    <tr className={"boardContentContainer " + i.boardSeq}>
                                        <td>{i.userName}</td>
                                        <td>{i.title}</td>
                                        <td>{i.date}</td>
                                        <td onClick={(e) => e.preventDefault()}>
                                            <button
                                                onClick={
                                                    () => {
                                                        if (window.confirm('해당 게시물을 삭제 하시겠습니까?')) {
                                                            requestDeletePost(i.boardSeq);
                                                        }
                                                    }}>삭제
                                            </button>
                                        </td>
                                    </tr>
                                </Link>
                            ))
                        }
                    </table>
                </div>
            </>
        );
    }

    return (
        <>
            <BoardHeader boardTitle={boardTitle} btnText={btnText} page={page} setPage={setPage} />
            <Routes>
                <Route path="/inquiry" element={<ShowBoardDetails testData={testData} userInfo={userInfo} />} />
                <Route path='/' element={testData.length !== 0 ? <ShowMyBoardList /> : <div>문의하신 내역이 없습니다.</div>}></Route>
            </Routes>
        </>
    )

} // MpQnA

function ShowBoardDetails({ testData, userInfo }) {
    const [searchParm] = useSearchParams();
    const selectBoardSeq = searchParm.get('boardSeq');
    const [selectData] = useState(testData.filter(i => i.boardSeq === parseInt(selectBoardSeq)));

    return (
        <>
            <InquiryForm selectData={selectData} userInfo={userInfo} />
        </>
    )

}
