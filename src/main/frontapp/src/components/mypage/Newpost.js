import { BoardHeader } from "./BoardHeader";
import InquiryForm from "./InquiryForm";

export default function Newpost({ checkLogin, page, setPage }) {
    const boardTitle = "문의 입력";
    const btnText = "문의 내역";

    return (
        <>
            <BoardHeader boardTitle={boardTitle} btnText={btnText} page={page} setPage={setPage} />
            <InquiryForm checkLogin={checkLogin} selectData={false}/>
        </>
    )
}
