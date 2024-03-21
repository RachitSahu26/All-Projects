import React, { useContext, useEffect, useState } from 'react';
import mycontext from '../../Context/myContext';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../Redux/Slice/CartSlice';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';
import { addToWishlist } from '../../Redux/Slice/WishlistSlice';

function ProductCard({ FilterProducts }) {
    const contextData = useContext(mycontext);
    const { allProduct, categories, auth } = contextData;
    // const navigate = useNavigate()
    // Combine allProduct and filterProducts into a single array
    const combinedProducts = FilterProducts.length > 0 ? FilterProducts : allProduct;

    const cartItem = useSelector((state) => state.cart);

    const dispatch = useDispatch()

 
    const navigate = useNavigate();

    const addCartItem = (product) => {
        if (auth?.token) {

            dispatch(addToCart(product));
            toast.success("Cart Successfully added")

        } else {
            navigate('/signin')
        }
    }


    const addToWishlistHandler = (product) => {
        dispatch(addToWishlist(product));
        toast.success("Wishlist Successfully added")
       
    }




    return (





        <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {combinedProducts.map((item, index) => (


                <div key={index} className="max-w-sm bg-white border h-[95%] max-h-[auto] m-2 p-2 border-gray-500 rounded-lg shadow">
                    <Link to={`/product/${item.slug}`}>
                        <img className="rounded-lg" src={`http://localhost:3000/api/product/product-photo/${item._id}`} alt={item.name} />
                    </Link>
                    <div>
                        <h3 className="text-lg font-bold text-black">{item.name}</h3>
                        <p class="mt-1 text-xs text-gray-700">${item.description.slice(0, 30)}${item.description.length > 30 ? '...' : ''}</p>
                        <p className="mt-1 text-lg text-black line-clamp-3">${item.price}</p>

                        <div className="flex justify-center mt-3 m-1">
                            <button onClick={() => addCartItem(item)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2">
                                Add to Cart
                            </button>

                            <button onClick={() => addToWishlistHandler(item)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                                <FaHeart />
                            </button>


                        </div>
                    </div>
                </div>




            ))}
        </div>




    );
}

export default ProductCard;
