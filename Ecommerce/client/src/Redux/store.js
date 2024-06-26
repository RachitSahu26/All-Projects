
import { configureStore } from '@reduxjs/toolkit';
import WishlistSlice from './Slice/WishlistSlice.js';
import CartSlice from './Slice/CartSlice';

export const store = configureStore({
  reducer: {
    wishlist:WishlistSlice,
    cart:CartSlice
    // Add other reducers here if needed
  },
});