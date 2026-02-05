import axios from "axios"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { Link } from "react-router"
import { useNavigate } from "react-router"

import { handleResponse } from "../utils/responseMessage"
import type { ApiErrorResponse } from "../types/ApiErrorResponse"
import type { CartData } from "../types/cart"
import { apiPublicPostOrder } from '../apis/order'
import { apiPublicGetCartData } from "../apis/cart"
import { BorderSpinner } from '../components/Spinner'
import { CouponCard } from '../components/CouponCard'
import { TotalPriceCard } from '../components/TotalPriceCard'
import type { orderData } from '../types/order'

export const CreateOrder = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<orderData>({ mode: 'onChange' })
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
  const onSubmit = async (data: orderData) => {
    console.log(data)
    try {
      const response = await apiPublicPostOrder(data)
      handleResponse(
        response?.data.message ?? "訂單已建立!",
        "success",
      )
      navigate('/')
    } catch (error) {

      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        handleResponse(
          error.response?.data.message ?? '無法完成訂單，請稍後再試',
          "warning",
        )
      } else {
        handleResponse("未知錯誤", "error")
      }
    }
  }

  useEffect(() => {
    getCartData()
  }, [])


  return (<>
    <div className="row">
      <div className="col-9">
        <form
          id="form"
          className="form-signin"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-floating input-group-sm">
            <input
              type="text"
              className="form-control"
              id="name"
              autoFocus
              {...register("user.name", {
                required: "請輸入收件人名稱",
              })}
            />
            <label htmlFor="name">收件人</label>
            <span className="text-danger d-block" style={{ minHeight: 28 }}>
              {errors.user?.name?.message}
            </span>
          </div>
          <div className="form-floating input-group-sm">
            <input
              type="email"
              className="form-control"
              id="email"
              {...register("user.email", {
                required: "Email 是必填項目",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "請輸入有效的 Email",
                },
              })}
            />
            <label htmlFor="email">Email</label>
            <span className="text-danger d-block" style={{ minHeight: 28 }}>
              {errors.user?.email?.message}
            </span>
          </div>
          <div className="form-floating input-group-sm">
            <input
              type="tel"
              className="form-control"
              id="tel"
              {...register("user.tel", {
                required: "電話是必填項目",
                minLength: {
                  value: 6,
                  message: "電話長度至少需為 6 個字元",
                }
              })}
            />
            <label htmlFor="tel">電話</label>
            <span className="text-danger d-block" style={{ minHeight: 28 }}>
              {errors.user?.tel?.message}
            </span>
          </div>
          <div className="form-floating input-group-sm">
            <input
              type="text"
              className="form-control"
              id="address"
              {...register("user.address", {
                required: "寄件人是必填項目",
              })}
            />
            <label htmlFor="address">收件地址</label>
            <span className="text-danger d-block" style={{ minHeight: 28 }}>
              {errors.user?.address?.message}
            </span>
          </div>
          <div className="form-floating input-group-sm">
            <input
              type="textarea"
              className="form-control"
              id="message"
              {...register("message", {
                required: false,
              })}
            />
            <label htmlFor="message">其他備註</label>
          </div>
          <button
            className="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
          >
            送出訂單
          </button>
        </form>
        {
          isLoading ? (
            <BorderSpinner />
          ) : (
            <>
              <div className=" mt-5">
                <p className="text-center fs-3">訂單詳情</p>
                <table className="table align-middle text-center">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">商品名稱</th>
                      <th scope="col">分類</th>
                      <th scope="col">單價</th>
                      <th scope="col">購買數量</th>
                      <th scope="col">金額</th>
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
                          <td>{item.qty}</td>
                          <td>{item.total}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )
        }
      </div>
      <div className="col-3">
        <CouponCard />
        <TotalPriceCard cartData={cartData} />
      </div>
    </div>
  </>)
}