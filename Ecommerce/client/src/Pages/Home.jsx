import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../Components/Layout/LayOut';
import mycontext from '../Context/myContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../Components/Spinner/Spinner.jsx';
import { Carousel } from 'antd';
import Filter from '../Components/Filter/Filter.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartPlus, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
// import { addToWishlist, removeFromWishlist } from '../Redux/Slice/WishlistSlice.js';
import { addToCart } from '../Redux/Slice/CartSlice.js';
import { addToWishlist, removeFromWishlist } from '../Redux/Slice/WishlistSlice.js';

function Home(props) {
    const contextData = useContext(mycontext);
    const { getAllProduct, allProduct, loading } = contextData;

    const [fiterProducts, setFilterProducts] = useState([]);
    const [radio, setRadio] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart || []);
    const isItemInCart = (item) => {
        return cartItems.some(cartItem => cartItem._id === item._id);
    };

    const wishlistItems = useSelector(state => state.wishlist.wishlistItems || []); // Extracting wishlist items from Redux store
    const isItemInWishlist = (item) => {
        return wishlistItems.some(wishItem => wishItem._id === item._id);
    };

    const handleButtonClick = (item) => {
        if (isItemInCart(item)) {
            navigate('/cart');
        } else {
            dispatch(addToCart(item));
            toast.success("Product Added");
        }
    }

    const wishlistHandler = (item) => {
        if (isItemInWishlist(item)) {
            dispatch(removeFromWishlist(item)); // Remove item from wishlist if already in wishlist
        } else {
            dispatch(addToWishlist(item)); // Add item to wishlist if not in wishlist
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filterHandle = async () => {
        try {
            const { data } = await axios.post("http://localhost:3000/api/product/filter-product", {
                category: selectedCategory,
                radio: radio
            });
            setFilterProducts(data?.products);
            toast.success("product filtered");
        } catch (error) {
            console.error("Error filtering products:", error);
        }
    };

    useEffect(() => {
        if (!radio.length || !selectedCategory.length) {
            getAllProduct();
        }
    }, [radio, selectedCategory]);

    useEffect(() => {
        if (radio.length || selectedCategory.length) {
            filterHandle();
        }
    }, [radio, selectedCategory]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        )
    }

    const imageUrls = [
        'https://media.istockphoto.com/id/1459477634/photo/organization-shelves-with-shoes-organized-and-lined-up.jpg?s=2048x2048&w=is&k=20&c=jXgUO8USRnduIeUpja5Od0x90QPjxlqlnhdHe3t2C9M=',
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80'
    ];

    return (
        <div>
            <LayOut>
                <div className="bg-black  flex flex-col">
                    <div className='  border-2 border-yellow-500 sm:h-[32rem] h-[12rem]  rounded-xl w-full mx-auto '>
                        <Carousel className="rounded-xl">
                            {imageUrls.map((imageUrl, index) => (
                                <div className="relative" key={index}>
                                    <img
                                        src={imageUrl}
                                        alt={`image ${index + 1}`}
                                        className="sm:h-[32rem] h-[12rem] p-2 w-full object-cover rounded-xl"
                                    />
                                    <button className="absolute  text-3xl top-[8rem] right-[17rem] sm:top-[25rem] sm:right-[70rem] bg-white text-black font-bold  sm:text-4xl px-3 py-1 rounded-lg">Button</button>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
                <div className='bg-black w-[100%] justify-center'>
                    <h1 className='text-white text-center p-5 text-3xl sm:text-5xl pt-7 pb-7'> Do shopping</h1>
                    <div className='hidden'>
                        <Filter
                            FilterHandle={filterHandle}
                            FiterProducts={fiterProducts}
                            HandleCategoryChange={handleCategoryChange}
                            Radio={radio}
                            setRadio={setRadio}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
                        {allProduct.map((item, index) => (
                            <div key={item._id} className=" sm:w-[85%] bg-white   border-2  h-[95%] max-h-[auto] m-2 p-2 border-gray-500 rounded-lg shadow relative">
                                <Link to={`/product/${item.slug}`}>
                                    <img className="rounded-lg item-center" src={`http://localhost:3000/api/product/product-photo/${item._id}`} alt={item.name} />
                                </Link>
                                <div className=''>
                                    <h3 className="text-lg  font-bold text-black">{item.name}</h3>
                                    <p className="mt-1 text-xs text-gray-700">${item.description.slice(0, 30)}${item.description.length > 30 ? '...' : ''}</p>
                                    <p className="mt-1 text-lg text-black line-clamp-3">${item.price}</p>
                                    <div className="flex flex-col  sm:flex-row justify-evenly mt-3 m-1">
                                        <button
                                            onClick={() => handleButtonClick(item)}
                                            className="bg-black transition border-2  border-teal-300 duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl text-white font-semibold sm:py-5 py-1 px-5 rounded-lg flex items-center"
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
                                        <button
                                            onClick={() => wishlistHandler(item)}
                                            className="bg-black transition border-2 border-teal-300 duration-300 ease-in-out transform hover:scale-90 hover:shadow-xl text-white font-semibold sm:py-5 py-1 px-4 rounded-lg flex items-center"
                                        >
                                            <FaHeart className={`mr-1 ${isItemInWishlist(item) ? 'text-red-500' : ''}`} /> {/* Toggling red color */}
                                            <span style={{
                                                color: isItemInWishlist(item) ? 'red' : 'white',
                                                fontSize: '15px'
                                            }}>
                                                {isItemInWishlist(item) ? 'Whislisted' : 'Wishlist'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </LayOut >
        </div >
    );
}

export default Home;
