import { createSlice } from "@reduxjs/toolkit";
// Initial state
const initialState = JSON.parse(localStorage.getItem('wishlist')) || [];

const wishListSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist(state, action) {
            state.push(action.payload)
            localStorage.setItem('wishlist', JSON.stringify(state));
        },
        removeFromWishlist(state, action) {
            return state.filter((item) => item._id !== action.payload);
        }
    }
})



// Export actions and reducer
export const { addToWishlist, removeFromWishlist } = wishListSlice.actions;
export default wishListSlice.reducer;