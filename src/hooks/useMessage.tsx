import { createAsyncMessage } from "../slices/messageSlice"
import { useAppDispatch } from '../store/hooks'

export const useMessage = () => {
  const dispatch = useAppDispatch()
  const showSuccess = (message: string) => {
    dispatch(createAsyncMessage({
      success: true,
      message
    }))
  }
  const showError = (message: string) => {
    dispatch(createAsyncMessage({
      success: false,
      message
    }))
  }

  return { showSuccess, showError }
}