export type orderData = {
  user: {
    name: string
    email: string
    tel: string
    address: string
  }
  message?: string
}

export type orderConfirmedResponse = {
  success: boolean
  message: string
  total: number
  create_at: string,
  orderId: string
}