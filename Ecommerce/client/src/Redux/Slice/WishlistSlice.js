import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: JSON.parse(localStorage.getItem('wishlist')) || [], // Load wishlist items from local storage
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlistItems.push(action.payload); // Add item to wishlist
      localStorage.setItem('wishlist', JSON.stringify(state.wishlistItems)); // Save wishlist items to local storage
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload._id
      ); // Remove item from wishlist
      localStorage.setItem('wishlist', JSON.stringify(state.wishlistItems)); // Save updated wishlist items to local storage
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;