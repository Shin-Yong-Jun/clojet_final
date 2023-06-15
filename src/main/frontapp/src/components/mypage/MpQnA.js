import { useEffect, useState } from "react";
import { BoardHeader } from "./BoardHeader";

export function MpQnA({ page, setPage, checkLogin }) {
    const [testData, setTestData] = useState([]);

    useEffect(() => {
        const myboardList = new XMLHttpRequest();
        myboardList.open("GET", "/mypage/myqna/list/" + `${checkLogin.userEmail}`, true);
        myboardList.responseType = "json";
        myboardList.send();
        myboardList.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === this.DONE) {
                setTestData(myboardList.response);
            }
        }
    }, []);

    const boardList = ["작성자", "제목", "내용", "작성일"];
    const boardTitle = "1:1 문의 내역";
    const btnText = "문의하기";

    if (testData.length !== 0) {
        return (
            <>
                <BoardHeader boardTitle={boardTitle} btnText={btnText} page={page} setPage={setPage} />
                <div className="qnaBoard">
                    <table border="1px">
                        <tr className="boardListContainer">
                            {
                                boardList.map(i => <td>{i}</td>)
                            }
                        </tr>

                        {
                            testData.map(i => (
                                <tr className="boardContentContainer">
                                    <td>{i.userName}</td>
                                    <td>{i.title}</td>
                                    <td>{i.content}</td>
                                    <td>{i.date}</td>
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