"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const List = () => {
  // 기본값으로 샘플 데이터 추가
  const [board, setBoard] = useState([
    { id: 1, title: "게시판 이용 안내", writer: "관리자", writeDate: "2025-05-15", hit: 245 },
    { id: 2, title: "Webjjang 사이트 오픈 안내", writer: "관리자", writeDate: "2025-05-14", hit: 187 },
    { id: 3, title: "첫 게시글 작성 방법", writer: "운영자", writeDate: "2025-05-13", hit: 156 },
    { id: 4, title: "자유게시판 이용 규칙 안내", writer: "운영자", writeDate: "2025-05-12", hit: 132 },
    { id: 5, title: "질문과 답변 게시판 오픈 예정", writer: "관리자", writeDate: "2025-05-11", hit: 98 },
  ])

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/board/list")
      .then((res) => {
        setBoard(res.data)
      })
      .catch((err) => {
        console.log("데이터 불러오기 실패", err)
        // 에러 발생 시 기본 데이터 유지
      })
  }, [])

  const submit = (id) => {
    console.log("넘겨질 게시글 번호", id)
    navigate("/board/view?id=" + id)
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <h2 className="font-weight-bold" style={{ color: "#232F3E" }}>
            게시판
          </h2>
          <hr className="mb-4" style={{ backgroundColor: "#232F3E", height: "2px" }} />
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th className="text-center" style={{ width: "10%" }}>
                    글번호
                  </th>
                  <th style={{ width: "50%" }}>제목</th>
                  <th className="text-center" style={{ width: "15%" }}>
                    작성자
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    작성일
                  </th>
                  <th className="text-center" style={{ width: "10%" }}>
                    조회수
                  </th>
                </tr>
              </thead>
              <tbody>
                {board.length > 0 ? (
                  board.map((board) => (
                    <tr key={board.id} onClick={() => submit(board.id)} style={{ cursor: "pointer" }}>
                      <td className="text-center">{board.id}</td>
                      <td>{board.title}</td>
                      <td className="text-center">{board.writer}</td>
                      <td className="text-center">{board.writeDate}</td>
                      <td className="text-center">{board.hit}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      게시글이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <form className="form-inline">
            <select className="form-control form-control-sm mr-2">
              <option>제목</option>
              <option>내용</option>
              <option>작성자</option>
            </select>
            <input type="text" className="form-control form-control-sm mr-2" placeholder="검색어를 입력하세요" />
            <button type="submit" className="btn btn-sm" style={{ backgroundColor: "#232F3E", color: "white" }}>
              검색
            </button>
          </form>
        </div>
        <div className="col-md-6 text-right">
          <a href="/board/write" className="btn" style={{ backgroundColor: "#232F3E", color: "white" }}>
            <i className="fa fa-pencil mr-1"></i> 글쓰기
          </a>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col text-center">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1">
                  이전
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#" style={{ backgroundColor: "#232F3E", borderColor: "#232F3E" }}>
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  다음
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default List
