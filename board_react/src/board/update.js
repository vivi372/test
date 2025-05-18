import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

const Update = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const id = query.get("id");

  const [vo, setVO] = useState({
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
          writeDate: "20250515",
          hit: 245,});

  useEffect(() => {
  if (!id) return;
  axios.get(`/api/board/view?id=${id}`)
    .then(res => {
      const data = res.data;

      // ✅ 공백 기준으로 날짜만 추출
      const dateOnly = data.writeDate?.split(" ")[0] || "";

      setVO({
        ...data,
        writeDate: dateOnly
      });
    })
    .catch(() => alert("조회 실패"));
}, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setVO({ ...vo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/board/update", vo)
      .then(() => {
        alert("수정 완료");
        navigate(`/board/view?id=${vo.id}`);
      })
      .catch(() => alert("수정 실패"));
  };

  const handleCancel = () => {
    navigate(`/board/view?id=${vo.id}`)
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <h2 className="font-weight-bold" style={{ color: "#232F3E" }}>
            게시글 수정
          </h2>
          <hr className="mb-4" style={{ backgroundColor: "#232F3E", height: "2px" }} />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-4"> 
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <label htmlFor="title" className="col-sm-2 col-form-label font-weight-bold">
                글 번호호
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  name="id"
                  readOnly
                  value={vo.id}
                  onChange={handleChange}
                />
                <small className="form-text text-muted">글번호는 변경할 수 없습니다.</small>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="title" className="col-sm-2 col-form-label font-weight-bold">
                제목
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="제목을 입력하세요"
                  value={vo.title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="writer" className="col-sm-2 col-form-label font-weight-bold">
                작성자
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="writer"
                  name="writer"
                  value={vo.writer}
                  readOnly
                />
                <small className="form-text text-muted">작성자는 변경할 수 없습니다.</small>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="writer" className="col-sm-2 col-form-label font-weight-bold">
                작성일
              </label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  id="writeDate"
                  name="writeDate"
                  value={vo.writeDate || ""}
                  readOnly
                />
                <small className="form-text text-muted">작성자는 변경할 수 없습니다.</small>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="content" className="col-sm-2 col-form-label font-weight-bold">
                내용
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="content"
                  name="content"
                  rows="15"
                  placeholder="내용을 입력하세요"
                  value={vo.content}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="form-group row mt-4">
              <div className="col-sm-12 text-right">
                <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel}>
                  취소
                </button>
                <button
                  type="submit"
                  className="btn"
                  style={{ backgroundColor: "#232F3E", color: "white" }}
                >
                  수정    
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Update;
