import { Link } from "react-router"

export const Footer = () => {
  return (
    <div className="border border-top pt-3">
      <div className="container">
        <Link className="fw-bold navbar-brand fs-5 text-dark" to="/">
          CozyLume
        </Link>
        <div className="d-flex gap-3">
          <Link to="/">FaceBook</Link>
          <Link to="/">Instagram</Link>
          <Link to="/">Threads</Link>
        </div>
        <div className="d-flex justify-content-between my-3">
          <p className="mb-0">© 2026 CozyLume Inc.</p>
          <div className="">
            <div className="d-flex gap-3">
              <Link to="/">隱私權</Link>
              <Link to="/">使用條款</Link>
              <Link to="/">Cookie</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}