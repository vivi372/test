const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#232F3E" }}>
        <div className="container">
          <a
            className="navbar-brand font-weight-bold"
            href="/"
            style={{ fontSize: "1.5rem", color: "white", letterSpacing: "0.5px" }}
          >
            <span style={{ fontWeight: "bold", paddingBottom: "2px" }}>Webjjang</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link text-white" href="/board/list">
                  게시판
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  게시판 메뉴
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/board/free">
                    자유게시판
                  </a>
                  <a className="dropdown-item" href="/board/notice">
                    공지사항
                  </a>
                  <a className="dropdown-item" href="/board/qna">
                    질문과답변
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
