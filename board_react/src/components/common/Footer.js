const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-4 fixed-bottom text-center" style={{ backgroundColor: "#444444", color: "white" }}>
      <div className="container">
        <h5 className="mb-3">Webjjang</h5>
        <p className="small mb-2">게시판 커뮤니티 사이트</p>
        <p className="mb-0 small">© {currentYear} Webjjang. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
