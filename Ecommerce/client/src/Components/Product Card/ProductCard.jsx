import React, { useContext, useEffect, useState } from 'react';
import mycontext from '../../Context/myContext';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../Redux/Slice/CartSlice';
import { toast } from 'react-toastify';
import { FaCartPlus, FaShoppingCart } from 'react-icons/fa';

function ProductCard({ FilterProducts }) {
    const contextData = useContext(mycontext);
    const { allProduct, categories, auth,baseUrl } = contextData;

    const combinedProducts = FilterProducts.length > 0 ? FilterProducts : allProduct;

    const cartItem = useSelector((state) => state.cart);

    const isItemInCart = (item) => {
        return cartItem.some(cartItem => cartItem._id === item._id);
    };

    const dispatch = useDispatch()


    const navigate = useNavigate();

    // const addCartItem = (product) => {
    //     if (auth?.token) {

    //         dispatch(addToCart(product));
    //         toast.success("Cart Successfully added")

    //     } else {
    //         navigate('/signin')
    //     }
    // }





    const handleButtonClick = (item) => {
        if (isItemInCart(item)) {
            // Redirect to cart page
            navigate('/cart');
        } else {
            // Add item to cart
            dispatch(addToCart(item));
            toast.success("Product Added");
        }
    };



    return (





        <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {combinedProducts.map((item, index) => (


                <div key={index} className="max-w-sm bg-white border h-[95%] max-h-[auto] m-2 p-2 border-gray-500 rounded-lg shadow">
                    <Link to={`/product/${item.slug}`}>
                        <img className="rounded-lg " src={`${baseUrl}/api/product/product-photo/${item._id}`} alt={item.name} />
                    </Link>
                    <div>
                        <h3 className="text-lg font-bold text-black">{item.name}</h3>
                        <p class="mt-1 text-xs text-gray-700">${item.description.slice(0, 30)}${item.description.length > 30 ? '...' : ''}</p>
                        <p className="mt-1 text-lg text-black line-clamp-3">${item.price}</p>

                        <div className="flex justify-center mt-3 m-1">

                            <button
                                onClick={() => handleButtonClick(item)}
                                className="bg-black transition border-2 border-teal-300 duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl text-white font-semibold py-2 px-4 rounded-lg flex items-center"
                            >
                                {isItemInCart(item) ? (
                                    <FaShoppingCart className="mr-2" />
                                ) : (
                                    <FaCartPlus className="mr-2" />
                                )}
                                <span style={{ color: isItemInCart(item) ? 'green' : 'white' }}>
                                    {isItemInCart(item) ? 'Go to Cart' : 'Add to Cart'}
                                </span>
                            </button>






                    


                        </div>
                    </div>
                </div>




            ))}
        </div>




    );
}

export default ProductCard;
