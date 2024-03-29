import mongoose from "mongoose";

const wishlistModel = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Assuming you have a Product model for items
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Assuming you have a User model for users
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Wishlist",wishlistModel );