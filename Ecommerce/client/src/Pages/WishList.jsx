import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaTrash } from 'react-icons/fa';
import LayOut from '../Components/Layout/LayOut.jsx'
import mycontext from '../Context/myContext.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../Redux/Slice/CartSlice.js';
import { removeFromWishlist } from '../Redux/Slice/WishlistSlice.js';
const WishList = () => {
    // Get wishlist items from Redux store
    const wishlistItems = useSelector(state => state.wishList);
    const contextData = useContext(mycontext);
    const { auth } = contextData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addCartItem = (p) => {
        if (auth?.token) {

            dispatch(addToCart(p));
            toast.success("Cart Successfully added")

        } else {
            navigate('/signin')
        }
    }

    const RemoveCartWishlist = (Id) => {
        console.log("Deleting product with ID:", Id);
        dispatch(removeFromWishlist(Id));
        toast.success("Item removed from Wishlist successfully");
    }


    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems])
    return (
        <LayOut>


            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl text-center font-bold mb-4"> My Wishlist</h2>
                {wishlistItems.length === 0 ? (
                   <p className="text-center text-gray-600 text-xl font-semibold mt-8">Your wishlist is empty.</p>

                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                <img src={`http://localhost:3000/api/product/product-photo/${item._id}`} alt={item.name} className="w-full h-48 object-cover mb-4" />
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <button className="text-red-500 hover:text-red-600 focus:outline-none">
                                        <FaHeart />
                                    </button>
                                </div>
                                <p className="text-gray-600">{item.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-gray-700">${item.price}</span>

                                    <div className='flex p-3 justify-between border-2 border-yellow-400'>



                                        <div>
                                            <button onClick={() => addCartItem(item)} className="bg-green-500  hover:bg-green-600 text-[10px] p-2 text-white font-semibold  rounded">
                                                Add to Cart
                                            </button>
                                        </div>

                                        <div>


                                            <button onClick={() => RemoveCartWishlist(item._id)} className="bg-red-500 text-[10px] hover:bg-red-600 p-2 ml-2 text-white text-sm font-semibold rounded flex items-center justify-center">
                                                <FaTrash className="mr-2" /> Remove from Wishlist
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
