import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { 
  GetProductsResponse,
  GetProductResponse,
} from '../types/product'

const API_BASE = import.meta.env.VITE_API_BASE
const API_PATH = import.meta.env.VITE_API_PATH

const productApi = axios.create({
  baseURL: API_BASE,
})

productApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const apiPublicGetProducts = (params: { page?: number, category?: string }): Promise<AxiosResponse<GetProductsResponse>> => productApi.get(`/api/${API_PATH}/products`, {
  params
})

export const apiPublicGetProduct = (id: string): Promise<AxiosResponse<GetProductResponse>> => productApi.get(`/api/${API_PATH}/product/${id}`)