import { useState } from "react"

export const CouponCard = () => {
  const [coupon, setCoupon] = useState<string>('')
  return (
    <div className="card py-4 px-3 mb-3">
      <div className="">
        <p className="mb-1">使用優惠券</p>
        <div className="input-group input-group-sm mb-3">
          <input type="text" className="form-control"
            id="coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button type="button" className="btn btn-primary btn-sm">套用</button>
        </div>
      </div>
      <div className="">
        <p className="mb-1">已套用優惠</p>
        <h5><span className="badge text-bg-secondary">新會員 9 折</span></h5>
      </div>
    </div>
  )
}