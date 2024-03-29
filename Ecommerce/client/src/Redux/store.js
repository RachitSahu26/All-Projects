// import { configureStore } from '@reduxjs/toolkit'
// import CartSlice from './Slice/CartSlice.js'
// import { wishlistSlice } from './Slice/WishlistSlice.js'

// export const store = configureStore({
//   reducer: {
//     cart: CartSlice,
//     wishList: wishlistSlice
//   },
//   devTools: true
// })





import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './Slice/CartSlice.js'
import wishlistReducer from './Slice/WishlistSlice.js' // Import as default export

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    wishList: wishlistReducer // Use imported reducer
  },
  devTools: true
})