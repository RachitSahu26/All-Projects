import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../Components/Layout/LayOut'
import mycontext from '../Context/myContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../Components/Spinner/Spinner.jsx';
import { Carousel } from 'antd';
import Filter from '../Components/Filter/Filter.jsx';
import ProductCard from '../Components/Product Card/ProductCard.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartPlus, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/Slice/CartSlice.js';

function Home(props) {

    const contextData = useContext(mycontext);
    const { getAllProduct, allProduct, loading } = contextData


    const [fiterProducts, setFilterProducts] = useState([]);
    const [radio, setRadio] = useState([]); // Define radio state here
    const [selectedCategory, setSelectedCategory] = useState([]);

    const cartItem = useSelector((state) => state.cart);
    console.log(cartItem)


    const isItemInCart = (item) => {
        return cartItem.some(cartItem => cartItem._id === item._id);
    };


    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [showfilter, setShowfilter] = useState(false)



    // Handler function to update the selected category

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

            toast.success("product filtered")
            console.log("Filtered products:", data);
        } catch (error) {
            console.error("Error filtering products:", error);
        }
    };
    useEffect(() => {
        if (!radio.length || !selectedCategory.length) {
            getAllProduct();
        }
    }, [radio, selectedCategory]); // Include radio and selectedCategory in the dependency array

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
    // const isSmallScreen = useMediaQuery('(max-width: 640px)');

    // const addCartItem = (product) => {
    //     ; // Use dispatch here

    // };

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










    // // ..................................filter toggleToast.......
    // const [showFilter, setShowFilter] = useState(false);

    // const handleFilterClick = () => {
    //     setShowFilter(!showFilter); // Toggle the visibility of the filter
    // };


    // const images = [
    //     { id: 1, src: 'https://img.freepik.com/premium-photo/teen-girl-casual-shoes-fashionable-shoes-women-feet-denim-clothes-lifestyle-trendy-design-background-photo_526934-188.jpg?w=360', alt: 'Image 1', aspectRatio: 'horizontal' },
    //     { id: 2, src: 'https://img.freepik.com/premium-photo/pile-various-female-shoes-isolated-white_392895-174880.jpg?w=826', alt: 'Image 2', aspectRatio: 'vertical' },
    //     { id: 3, src: 'https://img.freepik.com/premium-photo/shoes-running-woman-runner-high-tech-modern-shoe-design-speed-endurance-fitness-performance-workout-sports-athlete-start-outdoor-city-run-summer-cardio-race-exercise-city_590464-94344.jpg?w=360', alt: 'Image 3', aspectRatio: 'vertical' },
    //     { id: 4, src: 'https://img.freepik.com/free-photo/male-foot-with-brown-leather-shoes-jeans_1150-6001.jpg?w=360&t=st=1711280635~exp=1711281235~hmac=fd02f14e9266a748b8a33d082dee38b478be590797a3261c0b22682d03e50a57', alt: 'Image 4', aspectRatio: 'horizontal' },
    //     { id: 5, src: 'https://img.freepik.com/free-photo/panoramic-technology-banner-with-electronic-devices_23-2151215006.jpg?w=360&t=st=1711280676~exp=1711281276~hmac=43b77f7d5406f459f9b409f8305d0b7f736da7897f99a8e12017f7de97d207f4', alt: 'Image 5', aspectRatio: 'horizontal' },
    //     { id: 6, src: 'https://img.freepik.com/free-photo/close-up-collection-make-up-beauty-products_23-2148620012.jpg?w=996&t=st=1711280722~exp=1711281322~hmac=b5eef850214263fbcd4e67b27c9cabab8931ec2afe16619e0f0584281d4dc282', alt: 'Image 6', aspectRatio: 'vertical' }
    // ];

    const imageUrls = [
        'https://media.istockphoto.com/id/1459477634/photo/organization-shelves-with-shoes-organized-and-lined-up.jpg?s=2048x2048&w=is&k=20&c=jXgUO8USRnduIeUpja5Od0x90QPjxlqlnhdHe3t2C9M=',
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80'
    ];

    return (
        <div>
            <LayOut>
                <div className="bg-black  flex flex-col">
                    {/* Banner Carousel */}



                    <div className='  sm:h-[32rem] h-[12rem]  rounded-xl w-full mx-auto '>
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






















                {/* .................all products............ */}

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
                            <div key={index} className="max-w-sm bg-white border h-[95%] max-h-[auto] m-2 p-2 border-gray-500 rounded-lg shadow">
                                <Link to={`/product/${item.slug}`}>
                                    <img className="rounded-lg" src={`http://localhost:3000/api/product/product-photo/${item._id}`} alt={item.name} />
                                </Link>
                                <div>
                                    <h3 className="text-lg  font-bold text-black">{item.name}</h3>
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
                </div>










            </LayOut >
        </div >
    )
}

export default Home;