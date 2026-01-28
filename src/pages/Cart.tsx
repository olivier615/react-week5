import axios from "axios"
import { Link } from "react-router"
import { useState, useEffect } from "react"
import type { CartData } from "../types/cart"
import {
  apiPublicGetCartData,
  apiPublicUpdateCartItem,
  apiPublicRemoveCartItem
} from "../apis/cart"
import type { ApiErrorResponse } from "../types/ApiErrorResponse"
import { handleResponse, handleToast } from "../utils/responseMessage"
import { QuantityControl } from "../components/QuantityControl"
import { BorderSpinner } from '../components/Spinner'

export const Cart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [cartData, setCartData] = useState<CartData>({
    carts: [],
    final_total: 0,
    total: 0,
  })
  const getCartData = async () => {
    try {
      const response = await apiPublicGetCartData()
      setCartData(response.data.data)
      setIsLoading(false)
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        handleResponse(
          error.response?.data.message ?? "無法取得產品資料，請稍後再試",
          "warning",
        )
      } else {
        handleResponse("未知錯誤", "error")
      }
    }
  }

  const removeItem = async (id: string) => {
    try {
      const response = await apiPublicRemoveCartItem(id)
      handleToast(response.data.message, 'success')
      getCartData()
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        handleResponse(
          error.response?.data.message ?? '無法調整購物車，請稍後再試',
          'warning'
        )
      } else {
        handleResponse('未知錯誤', 'error')
      }
    }
  }

  const updateItemQty = async (cartItemId: string, nextQty: number) => {
    setCartData(prev => {
      const carts = prev.carts.map(item =>
        item.id === cartItemId
          ? { ...item, qty: nextQty, total: nextQty * item.product.price }
          : item
      )
      const total = carts.reduce((sum, c) => sum + c.total, 0)
      return { ...prev, carts, total, final_total: total }
    })
    try {
      await apiPublicUpdateCartItem({
        product_id: cartItemId,
        qty: nextQty
      })
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        handleResponse(
          error.response?.data.message ?? '無法調整購物車，請稍後再試',
          'warning'
        )
      } else {
        handleResponse('未知錯誤', 'error')
      }
    }
  }

  useEffect(() => {
    getCartData()
  }, [])

  return (
    <>
      <p className="text-center fs-3">
        {cartData.carts.length === 0
          ? '購物車還是空的，快去看看吧 : )'
          : '購物車列表'
        }
      </p>
      {
        isLoading ? (
          <BorderSpinner />
        ) : (
          <>
            <table className="table align-middle text-center">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">商品名稱</th>
                  <th scope="col">分類</th>
                  <th scope="col">單價</th>
                  <th scope="col">購買數量</th>
                  <th scope="col">金額</th>
                  <th scope="col">移除商品</th>
                </tr>
              </thead>
              <tbody>
                {cartData.carts.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/product/${item.product.id}`}>
                          {item.product.title}
                        </Link>
                      </td>
                      <td>{item.product.category}</td>
                      <td>{`${item.product.price} / ${item.product.unit}`}</td>
                      <td>
                        <QuantityControl
                          quantity={item.qty}
                          onIncrease={() => updateItemQty(item.id, item.qty + 1)}
                          onDecrease={() => updateItemQty(item.id, Math.max(1, item.qty - 1))}
                        />
                      </td>
                      <td>{item.total}</td>
                      <td>
                        <i className="bi bi-x-circle fs-5 text-danger"
                          style={{ cursor: 'pointer' }}
                          onClick={() => removeItem(item.id)}
                        ></i>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="d-flex flex-column align-items-end">
              <p className="fs-4 mb-0">總計：{cartData.final_total}</p>
              <div className="">
                <button type="button" disabled={cartData.carts.length === 0} className="btn btn-outline-primary mt-3">送出訂單</button>
              </div>
            </div>
          </>
        )

      }
    </>
  )
}
