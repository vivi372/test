"use client"

import axios from "axios"
import { useState } from "react"

const Write = () => {
  // 문자열로 초기화 (배열이 아닌)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [writer, setWriter] = useState("")
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    if (!title.trim()) {
      setError("제목을 입력해주세요.")
      return false
    }
    if (!content.trim()) {
      setError("내용을 입력해주세요.")
      return false
    }
    if (!writer.trim()) {
      setError("작성자를 입력해주세요.")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const data = {
      title,
      content,
      writer,
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await axios.post("http://localhost:8080/api/board/write", data)
      alert("글이 등록되었습니다.")
      window.location.href = "http://localhost:3000/board/list"
    } catch (err) {
      console.error(err)
      setError("글 등록에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <h2 className="font-weight-bold" style={{ color: "#232F3E" }}>
            게시글 작성
          </h2>
          <hr className="mb-4" style={{ backgroundColor: "#232F3E", height: "2px" }} />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-4">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <label htmlFor="title" className="col-sm-2 col-form-label font-weight-bold">
                제목
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  placeholder="작성자 이름을 입력하세요"
                  value={writer}
                  onChange={(e) => setWriter(e.target.value)}
                />
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
                  rows="10"
                  placeholder="내용을 입력하세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="form-group row mt-4">
              <div className="col-sm-12 text-right">
                <a href="/board/list" className="btn btn-secondary mr-2">
                  취소
                </a>
                <button
                  type="submit"
                  className="btn"
                  style={{ backgroundColor: "#232F3E", color: "white" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "등록 중..." : "등록하기"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Write
