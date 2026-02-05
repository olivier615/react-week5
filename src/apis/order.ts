import axios, { type AxiosResponse } from "axios";
// import type { UserLogInFormData, UserLogInResponse, MessageResponse } from "../types/user";
import type { orderData, orderConfirmedResponse } from '../types/order'

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const orderApi = axios.create({
  baseURL: API_BASE,
})

// orderApi.interceptors.request.use(
//   (request) => {
//     const token = document.cookie.replace(/(?:(?:^|.*;\s*)ReactToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

//     if (token) {
//       request.headers['Authorization'] = token
//     }
//     return request
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

orderApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const apiPublicPostOrder = (params: orderData): Promise<AxiosResponse<orderConfirmedResponse>> => orderApi.post(`/api/${API_PATH}/order`, {data: params})

