import { useNavigate } from "react-router"

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="text-center py-5">
      <h1>404</h1>
      <p>找不到頁面</p>
      <button
        type="button"
        className="btn btn-outline-primary btn-sm"
        onClick={() => navigate(-1)}
      >回上一頁</button>
    </div>
  )
}