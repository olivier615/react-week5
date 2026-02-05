import type { CartData } from "../types/cart"
type TotalPriceCardProps = {
  cartData: CartData
}

export const TotalPriceCard = ({cartData}: TotalPriceCardProps) => {
  const itemCount = () => {
    const number = cartData.carts.reduce((total, i) => {
      return total + i.qty
    }, 0)
    return number
  }
  return (<div className="card py-4 px-3">
    <p className="mb-3">購物車金額</p>
    <div className="d-flex justify-content-between">
      <p>小計 <small>（{itemCount()} 樣商品）</small></p>
      <p>{cartData.total}</p>
    </div>
    <div className="d-flex justify-content-between">
      <p>折扣金額</p>
      <p>{cartData.total - cartData.final_total}</p>
    </div>
    <div className="d-flex justify-content-between">
      <p>總計</p>
      <p>{cartData.final_total}</p>
    </div>
  </div>)
}