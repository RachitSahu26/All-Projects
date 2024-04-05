import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCartPlus, FaHeart, FaShoppingCart } from 'react-icons/fa';
import LayOut from '../Components/Layout/LayOut.jsx'
import mycontext from '../Context/myContext.jsx';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
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





    const cartItems = useSelector((state) => state.cart || []);
    const isItemInCart = (item) => {
        return cartItems.some(cartItem => cartItem._id === item._id);
    };






    // Save wishlist items to localStorage when they change
    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addCartItem = (p) => {



        if (auth?.token) {


            dispatch(addToCart(p));



            toast.success("Cart Successfully added",

                {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    style: {
                        borderRadius: '10px', // Set border radius
                        // Other CSS properties...
                    },

                }

            );


        } else {
            navigate('/signin');
        }
    };



    const removeWishItem = (item) => {
        dispatch(removeFromWishlist(item));

        toast.success("Removed Wishlist",

            {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                style: {
                    borderRadius: '10px', // Set border radius
                   
               
               
                    color: "red",
                },
               
            }

        );
    }



    return (
        <LayOut>
            <div className="container mx-auto bg-black px-4 py-8">
                <h2 className="text-2xl  text-white text-center font-bold mb-4"> My Wishlist</h2>
                {Object.values(wishlistItems).length === 0 ? (
                    <p className="text-center text-gray-600 text-xl font-semibold mt-8">Your wishlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {Object.values(wishlistItems).map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                <Link to={`/product/${item.slug}`}>
                                    <img src={`http://localhost:3000/api/product/product-photo/${item._id}`} alt={item.name} className="w-full h-48 object-cover mb-4" />
                                </Link>

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
                                        <div className=' flex  flex-col sm:flex-row '>
                                       
                                          
                                          
                                            <button
                                                    onClick={() => addCartItem(item)}
                                                    className="bg-black transition border-2 p-1 border-teal-300 duration-300 ease-in-out transform hover:scale-90 hover:shadow-xl text-white font-semibold sm:py-1 sm:px-1 py-2 px-5 rounded-lg flex items-center"
                                                >
                                                    {isItemInCart(item) ? (
                                                        <FaShoppingCart className="mr-2" />
                                                    ) : (
                                                        <FaCartPlus className="mr-2" />
                                                    )}
                                                    <span style={{
                                                        color: isItemInCart(item) ? 'green' : 'white',
                                                        fontSize: '15px'
                                                    }}>
                                                        {isItemInCart(item) ? 'Go to Cart' : 'Add to Cart'}
                                                    </span>
                                                </button>
                                          
                                          
                                          
                                          
                                            <button onClick={() => removeWishItem(item)} className="bg-black   border-2  border-teal-300 hover:bg-red-600  p-1  text-white font-semibold    sm:py-1 sm:px-1 py-2 px-5  rounded-lg duration-300 ease-in-out transform hover:scale-90  rounded">
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
