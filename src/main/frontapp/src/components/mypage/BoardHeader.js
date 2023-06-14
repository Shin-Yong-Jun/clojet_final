import { Link } from "react-router-dom";

export function BoardHeader({ boardTitle, btnText, page, setPage }) {
    return (
        <>
            <div className="boardHeader">
                <div className="boardTitle">{boardTitle}</div>
                <Link to={page === 'qna' ? '/mypage/newpost' : '/mypage/myqna'}
                    onClick={() => {
                        page === 'qna' ? setPage('newpost') : setPage('qna');
                    }}>
                    <button
                        className="makeQnAPost"
                        onClick={(e) => e.preventDefault}
                    >{btnText}</button>
                </Link>
            </div>
        </>
    )
}