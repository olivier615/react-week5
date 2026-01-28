import type { ProductData } from "./product"

export type CartData = {
  carts: CartsItem[]
  final_total: number
  total: number
}

export type CartsItem = {
  coupon: Coupon
  final_total: number
  id: string
  product: ProductData
  product_id: string
  qty: number
  total: number
}

export type Coupon = {
  code: string
  due_date: number
  id: string
  is_enabled: number
  percent: number
  title: string
}

export type AddToCartResponse = {
  success: boolean
  data: ProductData
  message: string
}

export type GetCartDataResponse = {
  success: boolean
  data: CartData
  message: string
}

export type UpdateCartDataResponse = {
  success: boolean
  data: {
    product_id: string
    qty: number
  }
  message: string
}

export type removeCartItemResponse = {
  success: boolean
  message: string
}