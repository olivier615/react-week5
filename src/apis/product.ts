import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { 
  GetProductsResponse,
  CreateProductResponse,
  CreateProductParams,
  DeleteProductResponse,
  EditProductParams,
  EditProductResponse,
  UploadImageResponse
} from '../types/product'

const API_BASE = import.meta.env.VITE_API_BASE
const API_PATH = import.meta.env.VITE_API_PATH

const productApi = axios.create({
  baseURL: API_BASE,
})

productApi.interceptors.request.use(
  (request) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)ReactToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (token) {
      request.headers['Authorization'] = token
    }

    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

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
// 好像需要準備客戶用版本