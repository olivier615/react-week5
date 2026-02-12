import axios from "axios"
import { useState } from 'react'
import { Link } from 'react-router'
import type { ProductData } from "../types/product"
import { apiPublicAddCartItem } from "../apis/cart"
import { GrowingSpinnerButton } from '../components/Spinner'
import { useMessage } from "../hooks/useMessage"

type ProductCardProps = {
  product: ProductData
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { showSuccess, showError } = useMessage()
  const [waitingId, setIsWaitingId] = useState<string>('')
  const addToCart = async (id: string, quantity: number) => {
    setIsWaitingId(id)
    try {
      const response = await apiPublicAddCartItem({ product_id: id, qty: quantity })
      showSuccess(response.data.message)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '無法加入購物車，請稍後再試'
        showError(message)
      } else {
        showError('發生未知錯誤')
      }
    } finally {
      setIsWaitingId('')
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
            {
              waitingId === product.id ? (
                <GrowingSpinnerButton />
              ) : (
                <button type="button" className="btn btn-outline-primary"
                  onClick={() => addToCart(product.id, 1)}>加入購物車
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}