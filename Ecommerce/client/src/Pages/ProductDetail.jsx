import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../Components/Layout/LayOut';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Slice/CartSlice';
import { toast } from 'react-toastify';
import mycontext from '../Context/myContext';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { addToWishlist } from '../Redux/Slice/WishlistSlice';

function ProductDetail() {
    const params = useParams();
    const [singleProduct, setSingleProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const contextData = useContext(mycontext);
    const { auth } = contextData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/product/get-product/${params.slug}`);
                setSingleProduct(response.data.product);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        if (params.slug) {
            getProduct();
        }
    }, [params.slug]);

    const addCartItem = (product) => {
        if (auth?.token) {
            dispatch(addToCart(product));
            toast.success("Cart Successfully added");
        } else {
            // Here, you might show a modal or message to inform the user to log in first
            navigate("/signin");
        }
    };


    // ..................add to WishlistSlice........
    const addToWishList = (Wishitem) => {
        dispatch(addToWishlist(Wishitem))
        toast.success("Added into Wishlist ")
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }

    return (
        <LayOut>
            <div className="container mx-auto p-2">
                {/* Your product detail layout */}

                <div className="max-w-5xl sm:max-w-3xl lg:max-w-7xl p-5 mx-auto bg-white shadow-md rounded overflow-hidden">
                    {singleProduct && (
                        <div className=" flex flex-col sm:flex-row ">

                            <div className="p-8 sm:w-full lg:w-[60%]">
                                <img className="rounded-lg w-full lg:w-[60%]  h-auto" src={`http://localhost:3000/api/product/product-photo/${singleProduct._id}`} alt={singleProduct.name} />
                            </div>



                            <div>

                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">{singleProduct.name}</h2>
                                <p className="text-black  mb-4">Description: {singleProduct.description}</p>

                                <hr className="border border-gray-400" />
                                <div className="mt-5 md:mt-6">

                                    <p className="text-black text-xl  font-bold">Price: ${singleProduct.price}</p>
                                    <h1 className="text-blue-700   text-xl font-bold">Price inclusive tasks</h1>


                                    {/* .............cart and buy btn......... */}
                                    <div className="flex space-x-4 p-3">

                                        <button onClick={() => addCartItem(singleProduct)} className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded flex items-center">
                                            <FaCartPlus className="mr-2" /> Add to Cart
                                        </button>
                                        <button onClick={() => addToWishList(singleProduct)} className="bg-white border-2 border-gray-500 text-black font-bold py-2 px-4 rounded flex items-center">
                                            <FaHeart className="mr-2" /> Wishlist
                                        </button>




                                    </div>

                                </div>
                                <hr className="border border-gray-400" />


                                <div className='md:mt-6 mt-5'>
                                    <p>100% original product</p>
                                    <div>
                                        <h2>Fast delivery</h2>
                                        <h2>Fast delivery</h2>
                                        <h2>Fast delivery</h2>

                                    </div>


                                </div>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </LayOut>
    );
}

export default ProductDetail;
