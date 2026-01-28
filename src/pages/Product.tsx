import { useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import axios from "axios"
import type { ProductData } from "../types/product"
import { apiPublicGetProduct } from "../apis/product"
import { apiPublicAddCartItem } from "../apis/cart"
import type { ApiErrorResponse } from "../types/ApiErrorResponse"
import { handleResponse, handleToast } from "../utils/responseMessage"
import { QuantityControl } from "../components/QuantityControl"

export const Product = () => {
  const navigate = useNavigate()
  const { id } = useParams<string>()
  const [quantity, setQuantity] = useState<number>(1)
  const [product, setProduct] = useState<ProductData>({
    category: "",
    content: "",
    description: "",
    id: "",
    imageUrl: "",
    imagesUrl: [],
    is_enabled: 0,
    num: 0,
    origin_price: 0,
    price: 0,
    title: "",
    unit: "",
    installation: "none",
  })

  const addToCart = async () => {
    if (typeof id !== 'string') return
    try {
      const response = await apiPublicAddCartItem({product_id: id , qty: quantity})
      handleToast(response.data.message, 'success')
      setQuantity(1)
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        handleResponse(
          error.response?.data.message ?? '無法加入購物車，請稍後再試',
          'warning'
        )
      } else {
        handleResponse('未知錯誤', 'error')
      }
    }
  }

  const decreaseQuantity = () => {
    if (quantity === 1) return
    setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const getProduct = async (id: string) => {
    try {
      const response = await apiPublicGetProduct(id)
      setProduct(response.data.product)
    } catch (error: unknown) {
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

  useEffect(() => {
    getProduct(id as string)
  }, [])

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-primary btn-sm"
        onClick={() => navigate(-1)}
      >回上一頁</button>
      <div className="mt-2 mb-3">
        <div className="row g-3">
          <div className="col-md-5">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                className="img-fluid rounded"
                alt={product.title}
              />
            )}
          </div>
          <div className="col-md-7">
            <div className="">
              <p className="mb-1">{product.category}</p>
              <h5 className="h2">{product.title}</h5>
              <p className="">{product.content}</p>
            </div>
            <div className="row g-2">
              {
                product.imagesUrl.length > 0 ?
                  product.imagesUrl.map(url => {
                    return (
                      <div className="col-3" key={url}>
                        <img className="img-fluid rounded" src={url} alt={url} />
                      </div>
                    )
                  })
                  : ''
              }
            </div>
            <hr />
            <div className="d-flex flex-column align-items-end">
              <p>原價：
                <del className="text-body-secondary">
                  {product.origin_price}
                </del>
              </p>
              <p>售價：{`${product.price} / ${product.unit}`}</p>
              <p className="">
                <small className="text-body-secondary">
                  {product.description}
                </small>
              </p>
              <div className="d-flex gap-3">
                <p className="fs-5 mb-0 align-self-center">購買數量</p>
                <QuantityControl
                quantity={quantity}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                />
                <button className="btn btn-outline-primary"
                  onClick={addToCart}
                >加入購物車</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
