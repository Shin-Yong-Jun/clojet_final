import { useEffect, useState } from "react";
import { BoardHeader } from "./BoardHeader";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import InquiryForm from "./InquiryForm";
import axios from "axios";

export function MpQnA({ page, setPage, userInfo }) {
    const boardList = ["작성자", "제목", "작성일"];
    const boardTitle = "1:1 문의 내역";
    const btnText = "문의하기";
    const [testData, setTestData] = useState([]);

    useEffect(() => {
        async function requestData() {
            try {
                const response = await axios.get(`/mypage/myqna/list/${sessionStorage.getItem('checkLogin')}`);
                setTestData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        requestData();
    }, []);

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
    const [selectData] = useState(testData.filter(i => i.boardSeq == selectBoardSeq));

    return (
        <>
            <InquiryForm selectData={selectData} userInfo={userInfo} />
        </>
    )

}
