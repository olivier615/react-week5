import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "axios"
import type { ProductData } from "../types/product"
import { apiPublicGetProduct } from "../apis/product"
import type { ApiErrorResponse } from "../types/ApiErrorResponse"
import { handleResponse } from "../utils/responseMessage"

export const Product = () => {
  const { id } = useParams()
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

  const getProduct = async (id: string) => {
    try {
      const response = await apiPublicGetProduct(id)
      console.log(response)
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
      <div className="mb-3">
        <div className="row g-3">
          <div className="col-md-5">
            <img
              src={product.imageUrl}
              className="img-fluid rounded"
              alt={product.title}
            />
          </div>
          <div className="col-md-7">
            <div className="">
              <h5 className="">{product.title}</h5>
              <p className="">{product.content}</p>
              <p className="">
                <small className="text-body-secondary">
                  {product.description}
                </small>
              </p>
            </div>
            <hr />
            <div className="d-flex">
              <p><del className="text-body-secondary">
                  {product.origin_price}
                </del>{product.price}</p>
              <button className="btn btn-outline-primary">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
