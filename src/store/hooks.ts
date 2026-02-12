import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// 之後用這個取代 useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch

// 之後用這個取代 useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector