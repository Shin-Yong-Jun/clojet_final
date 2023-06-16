import { useEffect, useState } from "react";
import { BoardHeader } from "./BoardHeader";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import InquiryForm from "./InquiryForm";

export function MpQnA({ page, setPage, checkLogin }) {
    const boardList = ["작성자", "제목", "작성일"];
    const boardTitle = "1:1 문의 내역";
    const btnText = "문의하기";

    /*
     * 스프링과 함께 실행시 아래 코드를 실행시켜주세요.
     */

    const [testData, setTestData] = useState([]);

    useEffect(() => {
        const myboardList = new XMLHttpRequest();
        myboardList.open("GET", `/mypage/myqna/list/${checkLogin.userEmail}`, true);
        myboardList.responseType = "json";
        myboardList.send();
        myboardList.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === this.DONE) {
                setTestData(myboardList.response);
            }
        }

    }, []);

    // ================구분선==================

    /*
     * 리액트로 테스트 실행시 아래 코드를 실행 시켜주세요
     */
    // const [testData, setTestData] = useState([
    //     {
    //         "boardSeq": 1,
    //         "typeOfInquiry": 'inquiry',
    //         "userName": "test",
    //         "userEmail": "hakro1@gmail.com",
    //         "title": "test1",
    //         "content": "1",
    //         "date": "2023.06.15 17:36:43",
    //         "response": false
    //     },
    //     {
    //         "boardSeq": 2,
    //         "typeOfInquiry": 'order',
    //         "userName": "test",
    //         "userEmail": "hakro1@gmail.com",
    //         "title": "test2",
    //         "content": "2",
    //         "date": "2023.06.15 17:36:56",
    //         "response": false
    //     },
    //     {
    //         "boardSeq": 3,
    //         "typeOfInquiry": 'payment',
    //         "userName": "test",
    //         "userEmail": "hakro1@gmail.com",
    //         "title": "test3",
    //         "content": "test4",
    //         "date": "2023.06.15 17:37:04",
    //         "response": false
    //     },
    //     {
    //         "boardSeq": 4,
    //         "typeOfInquiry": 'delivery',
    //         "userName": "test",
    //         "userEmail": "hakro1@gmail.com",
    //         "title": "tes4",
    //         "content": "teest5",
    //         "date": "2023.06.15 17:37:14",
    //         "response": false
    //     }
    // ]);

    function ShowMyBoardList() {
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
                                    </tr>
                                </Link>
                            ))
                        }
                    </table>
                </div>
            </>
        )
    }

    return (
        <>
            <BoardHeader boardTitle={boardTitle} btnText={btnText} page={page} setPage={setPage} />
            <Routes>
                <Route path="/inquiry" element=
                    {
                        <ShowBoardDetails
                            testData={testData}
                            checkLogin={checkLogin}
                        />
                    }
                />
                <Route path='/' element={testData.length !== 0 ? <ShowMyBoardList /> : <div>문의하신 내역이 없습니다.</div>}></Route>
            </Routes>
        </>
    )

} // MpQnA

function ShowBoardDetails({ testData, checkLogin }) {
    const [searchParm] = useSearchParams();
    const selectBoardSeq = searchParm.get('boardSeq');
    const [selectData] = useState(testData.filter(i => i.boardSeq == selectBoardSeq));

    return (
        <>
            <InquiryForm checkLogin={checkLogin} selectData={selectData} />
        </>
    )
}
