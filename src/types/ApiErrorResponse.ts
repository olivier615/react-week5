export type ApiErrorResponse = {
  success: false
  message: string
  error: {
    code: string
    message: string
  }
}