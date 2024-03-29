import React, { useEffect, useState } from 'react'
import LayOut from '../Components/Layout/LayOut'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import ProductCard from '../Components/Product Card/ProductCard';
import Spinner from '../Components/Spinner/Spinner';
import { FaCartPlus, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../Redux/Slice/CartSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

function CategoryProduct() {

    const [Product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [CategoryName, setCategoryName] = useState('')
    const navigate = useNavigate();

    const params = useParams();
    const dispatch = useDispatch()
 
    const cartItem = useSelector((state) => state.cart);

    const isItemInCart = (item) => {
        return cartItem.some(cartItem => cartItem._id === item._id);
    };
    
    
    const categoryBaseProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/product/category-base-product/${params.slug}`)

            setProduct(data?.products);
            setCategory(data?.category);
            // setCategoryName(response.data.name);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }



    useEffect(() => {
        if (params?.slug) {

            categoryBaseProduct();
        }

    }, [params?.slug])



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        )
    }


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
        <LayOut>




            <div className='border-2 bg-black  h-[50%] p-2'>
                <h2 className='text-white text-bold text-center text-2xl p-5'>Category:{category.name} </h2>


                <div className="flex justify-center">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
                        {Product.map((item, index) => (

                            <div key={index} className="max-w-sm  bg-white border h-[95%] max-h-[auto] m-2 p-2 border-gray-500 rounded-lg shadow">
                                <div className='flex justify-center'>

                                    <Link to={`/product/${item.slug}`}>
                                        <img className="rounded-lg" src={`http://localhost:3000/api/product/product-photo/${item._id}`} alt={item.name} />
                                    </Link>

                                </div>
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


                                        <button onClick={() => addToWishlistHandler(item)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                                            <FaHeart />
                                        </button>


                                    </div>
                                </div>
                            </div>


                        ))}
                    </div>
                </div>




            </div>


        </LayOut>
    )
}

export default CategoryProduct