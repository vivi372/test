import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate  } from "react-router-dom";

const View = () => {

    const location = useLocation(); // URL에서 id(글번호)를 꺼냄
    const param = new URLSearchParams(location.search);
    const id = param.get("id");

    console.log("넘어온 id = ", id);

    const [board, setBoard] = useState();
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
    <div>
      <h1>게시글 상세보기</h1>

      {!board && <p>📦 데이터를 불러오는 중입니다...</p>}

      {board && (
        <table>
          <tbody>
            <tr><th>글번호</th><td>{board.id}</td></tr>
            <tr><th>제목</th><td>{board.title}</td></tr>
            <tr><th>내용</th><td>{board.content}</td></tr>
            <tr><th>작성자</th><td>{board.writer}</td></tr>
            <tr><th>작성일</th><td>{board.writeDate}</td></tr>
            <tr><th>조회수</th><td>{board.hit}</td></tr>
          </tbody>
        </table>
      )}
            <button
            onClick={() => navigate(`/board/update?id=${id}`)}
            >수정
            </button>
      <button onClick={handleDelete}>삭제</button>

    </div>
  );
}



export default View;
