import axios from "axios"
import { Link } from 'react-router'
import type { ProductData } from "../types/product"
import { apiPublicAddCartItem } from "../apis/cart"
import type { ApiErrorResponse } from "../types/ApiErrorResponse"
import { handleResponse, handleToast } from "../utils/responseMessage"

type ProductCardProps = {
  product: ProductData
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = async (id: string, quantity: number) => {
    try {
      const response = await apiPublicAddCartItem({ product_id: id, qty: quantity })
      handleToast(response.data.message, 'success')
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        console.dir(error)
        handleResponse(
          error.response?.data.message ?? '無法加入購物車，請稍後再試',
          'warning'
        )
      } else {
        handleResponse('未知錯誤', 'error')
      }
    }
  }

  return (
    <div className="card mb-3">
      <img src={product.imageUrl} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">
          {product.title}
          <span className="badge bg-primary ms-2">{product.category}</span>
        </h5>
        <p className="card-text">{product.content}</p>
        <div className="d-flex justify-content-end">
          <div className="btn-group">
            <Link to={`/product/${product.id}`} className="btn btn-outline-primary">查看商品細節</Link>
            <button type="button" className="btn btn-outline-primary"
              onClick={() => addToCart(product.id, 1)}>加入購物車</button>
          </div>
        </div>
      </div>
    </div>
  )
}