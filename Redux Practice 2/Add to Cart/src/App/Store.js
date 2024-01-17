// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../Feature/CartSlice.js';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
