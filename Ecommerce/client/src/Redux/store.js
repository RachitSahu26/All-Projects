import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './Slice/CartSlice.js'
import WishlistSlice from './Slice/WishlistSlice.js'
// import CartSlice from './Slice/CartSlice'
export const store = configureStore({
  reducer: {
    cart: CartSlice,
    wishList: WishlistSlice
  },
  devTools: true
})