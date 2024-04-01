import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// const initialState =JSON.parse(localStorage.getItem('cart')) ?? [];
const initialState = JSON.parse(localStorage.getItem('cart')) || [];



const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state)); // Update local storage

    },
    removeToCart(state, action) {
      return state.filter((item) => item._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(newState)); // Update local storage
    
    },


    incrementQuantity(state, action) {
      const itemIndex = state.findIndex((item) => item._id === action.payload);
      if (itemIndex !== -1) {
        state[itemIndex].quantity += 1;
      }
    },


    decrementQuantity(state, action) {
      const itemIndex = state.findIndex((item) => item._id === action.payload);
      if (itemIndex !== -1 && state[itemIndex].quantity > 1) {
        state[itemIndex].quantity -= 1;
      }

    },



  }
});

export const { addToCart, removeToCart, incrementQuantity, decrementQuantity } = CartSlice.actions;
export default CartSlice.reducer;
