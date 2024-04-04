import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../Components/Layout/LayOut';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/Slice/CartSlice';
import { toast } from 'react-toastify';
import mycontext from '../Context/myContext';
import { FaCartPlus, FaExchangeAlt, FaHeart, FaMoneyBill, FaShoppingCart, FaTruck } from 'react-icons/fa';

function ProductDetail() {
    const params = useParams();
    const [singleProduct, setSingleProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const contextData = useContext(mycontext);
    const { auth } = contextData;
    const dispatch = useDispatch();
    const navigate = useNavigate();





    const cartItems = useSelector((state) => state.cart || []);
    const isItemInCart = (singleProduct) => {
        return cartItems.some(cartItem => cartItem._id === singleProduct._id);
    };






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



    // .................add to cart Handle..............
    const handleButtonClick = (singleProduct) => {
        if (isItemInCart(singleProduct)) {
            navigate('/cart');
        } else {
            dispatch(addToCart(singleProduct));
         

            toast.success("Product Added",

            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }

        );



        }
    }

    const checkUserJHander = () => {
        navigate("/signin");
    };

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


                                        {
                                            auth?.token ? (<>
                                                <button
                                                    onClick={() => handleButtonClick(singleProduct)}
                                                    className="bg-black transition border-2  border-teal-300 duration-300 ease-in-out transform hover:scale-90 hover:shadow-xl text-white font-semibold py-3 px-4 rounded-lg flex items-center"
                                                >
                                                    {isItemInCart(singleProduct) ? (
                                                        <FaShoppingCart className="mr-2" />
                                                    ) : (
                                                        <FaCartPlus className="mr-2" />
                                                    )}
                                                    <span style={{
                                                        color: isItemInCart(singleProduct) ? 'green' : 'white',
                                                        fontSize: '15px'
                                                    }}>
                                                        {isItemInCart(singleProduct) ? 'Go to Cart' : 'Add to Cart'}
                                                    </span>
                                                </button>
                                            </>) : (<>
                                                <button
                                                    onClick={checkUserJHander}
                                                    className="bg-black transition border-2 border-teal-300 duration-300 ease-in-out transform hover:scale-90 hover:shadow-xl text-white font-semibold sm:py-2 sm:px-2 py-1 px-5 rounded-lg flex items-center"
                                                >
                                                    <FaShoppingCart className="mr-2" />
                                                    <span>
                                                        Add to Cart
                                                    </span>
                                                </button>

                                            </>)
                                        }





                                    </div>

                                </div>
                                <hr className="border border-gray-400" />


                                <div className='md:mt-6 mt-5'>
                                    <p>100% original product</p>
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <FaTruck className="mr-2 text-blue-500" /> {/* Truck icon */}
                                            <h2 className="text-xl font-semibold">Fast delivery</h2>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <FaMoneyBill className="mr-2 text-blue-500" /> {/* Money bill icon */}
                                            <h2 className="text-xl font-semibold">Cash on Delivery available</h2>
                                        </div>
                                        <div className="flex items-center">
                                            <FaExchangeAlt className="mr-2 text-blue-500" /> {/* Exchange icon */}
                                            <h2 className="text-xl font-semibold">7 Days exchange available</h2>
                                        </div>
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
