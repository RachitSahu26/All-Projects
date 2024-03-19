import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../Components/Layout/LayOut'
import Filter from '../Components/Filter/Filter.jsx';
import ProductCard from '../Components/Product Card/ProductCard.jsx';
import mycontext from '../Context/myContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../Components/Spinner/Spinner.jsx';
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
                <div className='bg-black flex flex-col sm:flex-row'>

                    <div className='border-2 sm:w-1/4 hidden sm:block sticky top-0'>


                        <Filter
                            FilterHandle={filterHandle}
                            FiterProducts={fiterProducts}
                            HandleCategoryChange={handleCategoryChange}
                            Radio={radio}
                            setRadio={setRadio}

                        />


                    </div>





                    {/* 
                    <div className='block sm:hidden'>
                        <div className='text-white bg-red-300 block sm:hidden text-center text-4xl' onClick={handleFilterClick} >
                            {
                                showFilter ? (<button className="sm:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 1 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>) : (
                                    <h1>
                                        filter
                                    </h1>

                                )

                            }
                        </div>

                        {showFilter && <SmallFilter />}
                    </div>


 */}



                    <div className='border-2 sm:w-3/4 flex justify-center'>
                        <ProductCard FilterProducts={fiterProducts} />
                    </div>

                </div>
            </LayOut>
        </div>
    )
}

export default Home;