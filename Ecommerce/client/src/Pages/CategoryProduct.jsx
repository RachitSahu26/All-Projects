import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../Components/Layout/LayOut'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import ProductCard from '../Components/Product Card/ProductCard';
import Spinner from '../Components/Spinner/Spinner';
import { FaCartPlus, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../Redux/Slice/CartSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../Redux/Slice/WishlistSlice';
import mycontext from '../Context/myContext';



function CategoryProduct() {

    const [Product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [CategoryName, setCategoryName] = useState('')
    const navigate = useNavigate();


    const contextData = useContext(mycontext);
    const { auth,baseUrl } = contextData;

    const params = useParams();
    const dispatch = useDispatch()





    const cartItem = useSelector((state) => state.cart);

    const isItemInCart = (item) => {
        return cartItem.some(cartItem => cartItem._id === item._id);
    };





    // ................wishlist ..............
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems || []); // Extracting wishlist items from Redux store
    const isItemInWishlist = (item) => {
        return wishlistItems.some(wishItem => wishItem._id === item._id);
    };




    const categoryBaseProduct = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/product/category-base-product/${params.slug}`)

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


    const checkUserJHander = () => {
        navigate("/signin");
    };
    const handleButtonClick = (item) => {
        if (isItemInCart(item)) {
            // Redirect to cart page
            navigate('/cart');
        } else {
            // Add item to cart
            dispatch(addToCart(item));
            
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
    };


    // ......................wishlist Handler.........
    const wishlistHandler = (item) => {
        if (isItemInWishlist(item)) {
            dispatch(removeFromWishlist(item)); // Remove item from wishlist if already in wishlist
            
          
            toast.success(
                "Item removed from Wishlist",
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  style: {
                    color: "red", // Set background color of the progress bar line to red
                  },
                }
              );





        } else {
            dispatch(addToWishlist(item)); // Add item to wishlist if not in wishlist
           
       
            toast.success("Wishlisted",

            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            }

        );
        }
    };

    return (
        <LayOut>




            <div className='border-2 bg-black  h-[50%] p-2'>
                <h2 className='text-white text-bold text-center text-2xl p-5'>Category:{category.name} </h2>


                <div className="flex justify-center">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
                        {Product.map((item, index) => (

                            <div key={index} className="max-w-sm duration-300 ease-in-out transform hover:scale-90 bg-white border h-[95%] max-h-[auto] m-2 p-2 border-gray-500 rounded-lg shadow">
                                <div className='flex justify-center'>

                                    <Link to={`/product/${item.slug}`}>
                                        <img className="rounded-lg" src={`${baseUrl}/api/product/product-photo/${item._id}`} alt={item.name} />
                                    </Link>

                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-black">{item.name}</h3>
                                    <p class="mt-1 text-xs text-gray-700">${item.description.slice(0, 30)}${item.description.length > 30 ? '...' : ''}</p>
                                    <p className="mt-1 text-lg text-black line-clamp-3">${item.price}</p>

                                    <div className="flex flex-col  sm:flex-row justify-evenly mt-3 m-1">

                                        {auth.token ? (<>
                                            <button
                                                onClick={() => handleButtonClick(item)}
                                                className="bg-black transition border-2 border-teal-300 duration-300 ease-in-out transform hover:scale-90 hover:shadow-xl text-white font-semibold py-2 px-4 rounded-lg flex items-center"
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






                                            {/* .....................wishlist btn.............. */}
                                            <button
                                                onClick={() => wishlistHandler(item)}
                                                className="bg-black transition border-2 border-teal-300 duration-300 ease-in-out transform hover:scale-90 hover:shadow-xl text-white font-semibold py-3 px-4 rounded-lg flex items-center"
                                            >
                                                <FaHeart className={`mr-1 ${isItemInWishlist(item) ? 'text-red-500' : ''}`} /> {/* Toggling red color */}
                                                <span style={{
                                                    color: isItemInWishlist(item) ? 'red' : 'white',
                                                    fontSize: '15px'
                                                }}>
                                                    {isItemInWishlist(item) ? 'Whislisted' : 'Wishlist'}
                                                </span>
                                            </button>

                                        </>) : (<>
                                            <button
                                                onClick={checkUserJHander}
                                                className="bg-black transition border-2 border-teal-300 duration-300 ease-in-out transform hover:scale-90 hover:shadow-xl text-white font-semibold py-2 px-4 rounded-lg flex items-center"
                                            >
                                                <FaShoppingCart className="mr-2" />
                                                <span>Add to Cart</span>
                                            </button>



                                            {/* .....................wishlist btn.............. */}
                                            <button
                                                className="bg-black transition border-2 border-teal-300 duration-300 ease-in-out transform hover:scale-90 hover:shadow-xl text-white font-semibold sm:py-5 sm:px-2 py-1 px-4 rounded-lg flex items-center"
                                                onClick={checkUserJHander}
                                            >
                                                <FaHeart className='mr-1' />
                                                <span>
                                                    Wishlist
                                                </span>
                                            </button>



                                        </>)



                                        }









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