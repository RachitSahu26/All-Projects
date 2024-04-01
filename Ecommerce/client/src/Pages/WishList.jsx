import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import LayOut from '../Components/Layout/LayOut.jsx'
import mycontext from '../Context/myContext.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../Redux/Slice/CartSlice.js';
// import { addToWishlist, removeFromWishlist } from '../Redux/Slice/WishlistSlice.js';
import axios from 'axios';
import { removeFromWishlist } from '../Redux/Slice/WishlistSlice.js';

const WishList = () => {
    const contextData = useContext(mycontext);
    const { auth } = contextData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get wishlist items from Redux store

    const wishlistItems = useSelector(state => state.wishlist.wishlistItems || []);


    // Save wishlist items to localStorage when they change
    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addCartItem = (p) => {
        if (auth?.token) {
            dispatch(addToCart(p));
            toast.success("Cart Successfully added");
        } else {
            navigate('/signin');
        }
    };



    const removeWishItem=(item)=>{
        dispatch(removeFromWishlist(item));
    }
  


    return (
        <LayOut>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl text-center font-bold mb-4"> My Wishlist</h2>
                {Object.values(wishlistItems).length === 0 ? (
                    <p className="text-center text-gray-600 text-xl font-semibold mt-8">Your wishlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.values(wishlistItems).map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                <img src={`http://localhost:3000/api/product/product-photo/${item._id}`} alt={item.name} className="w-full h-48 object-cover mb-4" />
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <button className="text-red-500 hover:text-red-600 focus:outline-none" onClick={() => wishlistHandler(item)}>
                                        <FaHeart />
                                    </button>
                                </div>
                                <p className="text-gray-600">{item.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-gray-700">${item.price}</span>
                                    <div className='flex p-3 justify-between'>
                                        <div className=' flex  flex-col sm:flex-row'>
                                            <button onClick={() => addCartItem(item)} className="bg-green-500 hover:bg-green-600 text-1xl p-2 text-white font-semibold  duration-300 ease-in-out transform hover:scale-110   rounded">
                                                Add to Cart
                                            </button>
                                            <button onClick={() => removeWishItem(item._id)} className="bg-black mt-3 hover:bg-red-600 text-1xl p-2 text-white font-semibold   duration-300 ease-in-out transform hover:scale-110  rounded">
                                                Remvoe to wishlist
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </LayOut>
    );
};

export default WishList;
