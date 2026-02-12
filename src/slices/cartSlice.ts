import axios from 'axios'
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import type { CartData } from '../types/cart'
import { apiPublicGetCartData } from '../apis/cart'
import type { RootState } from '../store/store'
import { createAsyncMessage } from "../slices/messageSlice"

const initialState: CartData = {
  carts: [],
  final_total: 0,
  total: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCarts(state, action) {
      state.carts = [...action.payload]
    },
    setTotal(state, action) {
      state.total = action.payload
    },
    setFinal_total(state, action) {
      state.final_total = action.payload
    },
  },
})

export const getAsyncCarts = createAsyncThunk(
  'product/getAsyncCarts',
  async (_, { dispatch }) => {
    try {
      const response = await apiPublicGetCartData()
      dispatch(setCarts(response.data.data.carts))
      dispatch(setTotal(response.data.data.total))
      dispatch(setFinal_total(response.data.data.final_total))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || '無法取得產品資料，請稍後再試'
        dispatch(
          createAsyncMessage({
            success: false,
            message,
          })
        )
      } else {
        dispatch(
          createAsyncMessage({
            success: false,
            message: '發生未知錯誤',
          })
        )
      }
    }
  },
)

export const selectCart = (state: RootState) => state.cart

export const selectCartQty = createSelector([selectCart], (cart) =>
  cart.carts.reduce((sum, item) => sum + item.qty, 0),
)

export const { setCarts, setTotal, setFinal_total } = cartSlice.actions
export default cartSlice.reducer
