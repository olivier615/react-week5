import type { ProductData } from './product'

export type GetCartResponse = {
  success: boolean
  product: ProductData
  message: string
}