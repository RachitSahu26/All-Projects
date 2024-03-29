import { createSlice } from '@reduxjs/toolkit';

// Load the wishlist items from local storage if available
const storedItems = JSON.parse(localStorage.getItem('wishlistItems'));

const initialState = {
    items: storedItems || {}, // Load from local storage or initialize as an empty object
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const itemId = action.payload;
            state.items[itemId] = true; // Add the item to the wishlist object
            // Save the updated wishlist to local storage
            localStorage.setItem('wishlistItems', JSON.stringify(state.items));
        },
        removeFromWishlist: (state, action) => {
            const itemId = action.payload;
            delete state.items[itemId]; // Remove the item from the wishlist object
            // Save the updated wishlist to local storage
            localStorage.setItem('wishlistItems', JSON.stringify(state.items));
        },
    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
