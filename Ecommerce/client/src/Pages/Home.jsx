import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../Components/Layout/LayOut'
import mycontext from '../Context/myContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../Components/Spinner/Spinner.jsx';
import { Carousel } from 'antd';
// import ProductCard from '../Components/Product Card/ProductCard.jsx'
// import  Filter from '../Components/Filter/Filter.jsx'
// import SmallFilter from '../Components/Filter/SmallFilter.jsx';
// import SmallFilter from '../Components/Filter/SmallFilter.jsx';
// import SmallFilter from '../Components/Filter/SmallFilter.jsx';
// import SmallFilter from '../Components/Filter/SmallFilter.jsx';

function Home(props) {

    const contextData = useContext(mycontext);
    const { getAllProduct, loading } = contextData


    const [fiterProducts, setFilterProducts] = useState([]);
    const [radio, setRadio] = useState([]); // Define radio state here
    const [selectedCategory, setSelectedCategory] = useState([]);

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













    // // ..................................filter toggleToast.......
    // const [showFilter, setShowFilter] = useState(false);

    // const handleFilterClick = () => {
    //     setShowFilter(!showFilter); // Toggle the visibility of the filter
    // };







    return (
        <div>
            <LayOut>
                <div className="bg-black  flex flex-col">
                    {/* Banner Carousel */}

                    <div className='border-2  h-[32rem]  rounded-xl w-full mx-auto '>
                        <Carousel className="rounded-xl">
                            <img
                                src='https://media.istockphoto.com/id/1459477634/photo/organization-shelves-with-shoes-organized-and-lined-up.jpg?s=2048x2048&w=is&k=20&c=jXgUO8USRnduIeUpja5Od0x90QPjxlqlnhdHe3t2C9M=' alt="image 1"
                                className="  h-[32rem] p-2 w-full object-cover rounded-xl"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                                alt="image 2"
                                className=" h-[32rem]  p-2 w-full object-cover rounded-xl"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                                alt="image 3"
                                className=" h-[32rem]  p-2 w-full object-cover rounded-xl"
                            />
                        </Carousel>
                    </div>


                    <div className=" p-5 rounded-xl flex justify-center">
                        {/* Content for boys */}
                        <div className="border-2 rounded-xl bg-white m-2">
                            {/* <h2 className="text-center text-xl font-semibold">Boys</h2> */}
                            {/* Add content specific to boys here */}
                            <img className=' rounded-xl' src="https://images.unsplash.com/photo-1465877783223-4eba513e27c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGtpZHMlMjBzaG9lfGVufDB8fDB8fHww" alt="Boys" />
                        </div>

                        {/* Content for girls */}
                        <div className="border-2 rounded-xl bg-white  m-2">
                            {/* <h2 className="text-center text-xl font-semibold">Girls</h2> */}
                            {/* Add content specific to girls here */}
                            <img className=' rounded-xl' src="https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHMlMjBzaG9lfGVufDB8fDB8fHww" alt="Girls" />
                        </div>
                    </div>

                </div>
































            </LayOut >
        </div >
    )
}

export default Home;