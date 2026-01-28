import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type {
  AddToCartResponse,
  GetCartDataResponse,
  UpdateCartDataResponse,
  removeCartItemResponse
} from '../types/cart'
const API_BASE = import.meta.env.VITE_API_BASE
const API_PATH = import.meta.env.VITE_API_PATH

const cartApi = axios.create({
  baseURL: API_BASE,
})

cartApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const apiPublicAddCartItem = (params: { product_id: string, qty: number }): Promise<AxiosResponse<AddToCartResponse>> => cartApi.post(`/api/${API_PATH}/cart`, {
    data: params
})

export const apiPublicGetCartData = ():Promise<AxiosResponse<GetCartDataResponse>> => cartApi.get(`/api/${API_PATH}/cart`)

export const apiPublicUpdateCartItem = (params: { product_id: string, qty: number }): Promise<AxiosResponse<UpdateCartDataResponse>> => cartApi.put(`/api/${API_PATH}/cart/${params.product_id}`, {
    data: params
})

export const apiPublicRemoveCartItem = (id: string):Promise<AxiosResponse<removeCartItemResponse>> => cartApi.delete(`/api/${API_PATH}/cart/${id}`)
