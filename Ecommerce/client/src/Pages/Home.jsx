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
import { addToCart } from '../Redux/Slice/CartSlice.js';
import { addToWishlist, removeFromWishlist } from '../Redux/Slice/WishlistSlice.js';
import { baseUrl } from '../urls.js';

function Home(props) {
    const contextData = useContext(mycontext);
    const { getAllProduct, allProduct, loading, auth } = contextData;

    const [fiterProducts, setFilterProducts] = useState([]);
    const [radio, setRadio] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();




    const cartItems = useSelector((state) => state.cart || []);
    const isItemInCart = (item) => {
        return cartItems.some(cartItem => cartItem._id === item._id);
    };




    const wishlistItems = useSelector(state => state.wishlist.wishlistItems || []);
    const isItemInWishlist = (item) => {
        return wishlistItems.some(wishItem => wishItem._id === item._id);
    };


    
    const handleButtonClick = (item) => {
        if (isItemInCart(item)) {
            navigate('/cart');
        } else {
            dispatch(addToCart(item));
      
            toast.success("Product Added",

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

        }
    }

    const wishlistHandler = (item) => {
        if (auth.token) {
            if (isItemInWishlist(item)) {
                dispatch(removeFromWishlist(item));
               


                
            
                








                
            } else {
                dispatch(addToWishlist(item));

                toast.success("Wishlisted",

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


            }
        } else {
            navigate('/signin');
        }
    };

    const checkUserJHander = () => {
        navigate("/signin");
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filterHandle = async () => {
        try {
            const { data } = await axios.post(`${baseUrl}/api/product/filter-product`, {
                category: selectedCategory,
                radio: radio
            });
            setFilterProducts(data?.products);
            toast.success("Product filtered",

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
        'https://img.freepik.com/free-photo/female-legs-sneakers-with-flowers-yellow-background_185193-109402.jpg?w=1060&t=st=1712118781~exp=1712119381~hmac=c7dc0f6fe6c0a15e95c5dd0163a11f712b586ac6d5e072f006aa285d732cd020',
        'https://img.freepik.com/free-vector/modern-sale-banner-with-product-description_1361-1259.jpg?w=1060&t=st=1712118812~exp=1712119412~hmac=bd57f2a03130e6c872eed01f5ab94cd50f059e6985ccd7ce109846461d31ead6',
        'https://img.freepik.com/free-vector/classic-shoes-realistic-composition_1284-65193.jpg?t=st=1712118975~exp=1712122575~hmac=51613cf48572fd389bb6f58db5ef9c6ec3e71a6a71a3d5b193e8b98f24cc23be&w=1060',
        'https://img.freepik.com/free-photo/pack-baby-shoes-with-different-designs_1203-1856.jpg?w=1060&t=st=1712119031~exp=1712119631~hmac=70e4142946bdcce0f4ce42103f3efcc1c10502f06b798c70abac8a594ee4050e'];

    return (
        <div>
            <LayOut>
                <div className="bg-black  flex flex-col">
                    <div className='sm:h-[32rem] h-[12rem]  rounded-xl w-full mx-auto '>
                        <Carousel className="rounded-xl">
                            {imageUrls.map((imageUrl, index) => (
                                <div className="relative" key={index}>
                                    <img
                                        src={imageUrl}
                                        alt={`image ${index + 1}`}
                                        className="sm:h-[32rem] h-[12rem] p-2 w-full object-cover rounded-xl"
                                    />
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
                    <div className="grid grid-cols-2 gap-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
                        {allProduct.map((item, index) => (
                            <div key={item._id} className="sm:w-[85%] duration-300 ease-in-out transform hover:scale-90 bg-white border-2 h-[95%] max-h-[auto] m-2 p-2 border-gray-500 rounded-lg shadow relative">
                                <Link to={`/product/${item.slug}`}>
                                    <img className="rounded-lg item-center" src={`${baseUrl}/api/product/product-photo/${item._id}`} alt={item.name} />
                                </Link>
                                <div className=''>
                                    <h3 className="text-lg  font-bold text-black">{item.name}</h3>
                                    <p className="mt-1 text-xs text-gray-700">${item.description.slice(0, 30)}${item.description.length > 30 ? '...' : ''}</p>
                                    <p className="mt-1 text-lg text-black line-clamp-3">${item.price}</p>
                                    <div className="flex flex-col sm:flex-row justify-evenly mt-3 m-1">
                                        {auth?.token ? (
                                            <>
                                                <button
                                                    onClick={() => handleButtonClick(item)}
                                                    className="bg-black transition border-2 border-teal-300 duration-300 ease-in-out transform hover:scale-90 hover:shadow-xl text-white font-semibold sm:py-2 sm:px-2 py-1 px-5 rounded-lg flex items-center"
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
                                                    className="bg-black transition border-2 border-teal-300 duration-300 ease-in-out transform hover:scale-90 hover:shadow-xl text-white font-semibold sm:py-5 sm:px-2 py-1 px-4 rounded-lg flex items-center"
                                                >
                                                    <FaHeart className={`mr-1 ${isItemInWishlist(item) ? 'text-red-500' : ''}`} />
                                                    <span style={{
                                                        color: isItemInWishlist(item) ? 'red' : 'white',
                                                        fontSize: '15px'
                                                    }}>
                                                        {isItemInWishlist(item) ? 'Whislisted' : 'Wishlist'}
                                                    </span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={checkUserJHander}
                                                    className="bg-black transition border-2 border-teal-300 duration-300 ease-in-out transform hover:scale-90 hover:shadow-xl text-white font-semibold sm:py-2 sm:px-2 py-1 px-5 rounded-lg flex items-center"
                                                >
                                                    <FaShoppingCart className="mr-2" />
                                                    <span>
                                                        Add to Cart
                                                    </span>
                                                </button>
                                                <button
                                                    className="bg-black transition border-2 border-teal-300 duration-300 ease-in-out transform hover:scale-90 hover:shadow-xl text-white font-semibold sm:py-5 sm:px-2 py-1 px-4 rounded-lg flex items-center"
                                                    onClick={checkUserJHander}
                                                >
                                                    <FaHeart className='mr-1' />
                                                    <span>
                                                        Wishlist
                                                    </span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </LayOut>
        </div>
    );
}

export default Home;
