import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate  } from "react-router-dom";

const View = () => {

    const location = useLocation(); // URL에서 id(글번호)를 꺼냄
    const param = new URLSearchParams(location.search);
    const id = param.get("id");

    console.log("넘어온 id = ", id);

    const [board, setBoard] = useState({
          id: 1,
          title: "Webjjang 게시판 이용 안내",
          content: `안녕하세요, Webjjang 관리자입니다.
이 게시판은 회원들 간의 자유로운 소통을 위한 공간입니다.
게시판 이용 시 다음 사항을 준수해 주시기 바랍니다.

1. 상대방을 존중하는 언어를 사용해 주세요.
2. 개인정보 보호에 유의해 주세요.
3. 저작권을 침해하는 자료 게시를 삼가해 주세요.
4. 광고성 글은 관련 게시판에만 작성해 주세요.

즐거운 커뮤니티 활동 되시길 바랍니다.
감사합니다.`,
          writer: "관리자",
          writeDate: "2025-05-15",
          hit: 245,});
    const navigate = useNavigate();

      const targetId = location.state?.id;
    


    useEffect(() => {
        console.log("🔥 useEffect 실행됨", id);
        axios.get(`http://localhost:8080/api/board/view?id=${id}`)
    .then((res) => {
      setBoard(res.data); // 응답 데이터를 상태에 저장
    })
    .catch((err) => {
      console.log("데이터 불러오기 실패", err); // 오류 발생 시 로그 출력
    });
}, [id]);

// view.js 안에
const handleDelete = () => {
  if (!window.confirm("정말 삭제하시겠습니까?")) return;

  axios.post(`/api/board/delete?id=${id}`)
    .then(() => {
      alert("삭제 완료");
      navigate("/board/list");
    })
    .catch(() => {
      alert("삭제 실패");
    });
};
  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <h2 className="font-weight-bold" style={{ color: "#232F3E" }}>
            게시글 상세보기
          </h2>
          <hr className="mb-4" style={{ backgroundColor: "#232F3E", height: "2px" }} />
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white py-3">
          <h4 className="mb-1">{board.title}</h4>
          <div className="d-flex justify-content-between align-items-center small text-muted">
            <div>
              <span className="mr-3">작성자: {board.writer}</span>
              <span>작성일: {board.writeDate}</span>
            </div>
            <div>
              <span>조회수: {board.hit}</span>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="post-content mb-4" style={{ minHeight: "200px", whiteSpace: "pre-line" }}>
            {board.content}
          </div>

          <div className="border-top pt-3 d-flex justify-content-between">
            <div>
              <button
                className="btn btn-sm mr-2"
                onClick={() => navigate("/board/list")}
                style={{ backgroundColor: "#6c757d", color: "white" }}
              >
                목록
              </button>
            </div>
            <div>
              <button
                className="btn btn-sm mr-2"
                onClick={() => navigate("/board/update?id="+board.id)}
                style={{ backgroundColor: "#232F3E", color: "white" }}
              >
                수정
              </button>
              <button
                className="btn btn-sm"
                onClick={handleDelete}
                style={{ backgroundColor: "#dc3545", color: "white" }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );   
}



export default View;
