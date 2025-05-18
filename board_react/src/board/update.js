import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

const Update = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const id = query.get("id");

  const [vo, setVO] = useState({
    id: "",
    title: "",
    content: "",
    writer: "",
    writeDate: ""
  });

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

  return (
    <form onSubmit={handleSubmit}>
      <div><label>글 번호</label><input type="text" name="id" value={vo.id} readOnly /></div>
      <div><label>제목</label><input type="text" name="title" value={vo.title} onChange={handleChange} /></div>
      <div><label>내용</label><input type="text" name="content" value={vo.content} onChange={handleChange} /></div>
      <div><label>작성자</label><input type="text" name="writer" value={vo.writer} onChange={handleChange} /></div>
      <div><label>작성일</label><input type="date" name="writeDate" value={vo.writeDate || ""} readOnly /></div>
      <button type="submit">수정 완료</button>
    </form>
  );
};

export default Update;
