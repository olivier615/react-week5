import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { 
  GetProductsResponse,
  GetProductResponse,
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

// public

export const apiPublicGetProducts = (params: { page?: number, category?: string }): Promise<AxiosResponse<GetProductsResponse>> => productApi.get(`/api/${API_PATH}/products`, {
  params
})

export const apiPublicGetProduct = (id: string): Promise<AxiosResponse<GetProductResponse>> => productApi.get(`/api/${API_PATH}/product/${id}`)


// admin

export const apiGetProducts = (params: { page?: number, category?: string }): Promise<AxiosResponse<GetProductsResponse>> => productApi.get(`/api/${API_PATH}/admin/products`, {
  params
})

export const apiCreateProduct = (params: CreateProductParams): Promise<AxiosResponse<CreateProductResponse>> =>
  productApi.post(`/api/${API_PATH}/admin/product`, {
    data: params,
  })

  export const apiDeleteProduct = (productId: string): Promise<AxiosResponse<DeleteProductResponse>> =>
  productApi.delete(`/api/${API_PATH}/admin/product/${productId}`)

  export const apiEditProduct = (params: EditProductParams): Promise<AxiosResponse<EditProductResponse>> => {
  const { data, id } = params
  return productApi.put(`/api/${API_PATH}/admin/product/${id}`, {
    data,
  })
}

export const apiUploadImage = async (file: FormData): Promise<AxiosResponse<UploadImageResponse>> =>
  productApi.post(`/api/${API_PATH}/admin/upload`, file)