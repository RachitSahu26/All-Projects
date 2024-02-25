import React, { useContext, useEffect } from 'react'
import LayOut from '../Components/Layout/LayOut'

import Filter from '../Components/Filter/Filter.jsx';
import ProductCard from '../Components/Product Card/ProductCard.jsx';
import mycontext from '../Context/myContext.jsx';
// import { json } from 'react-router-dom';

function Home(props) {




    const contextData = useContext(mycontext);
    const { getAllProduct, filterHandle, radio, selectedCategory, setSelectedCategory } = contextData

    useEffect(() => {
        if (!selectedCategory.length || !radio.length) {
            getAllProduct();
        }
    }, [selectedCategory.length, radio.length]);

    useEffect(() => {
        if (selectedCategory.length || radio.length) {
            filterHandle();
        }
    }, [selectedCategory, radio]);



    return (
        <div>
            <LayOut>


                <div className='bg-red-200 flex  ' >


                    <div className=' border-2 border-red-500  w-[50%]'>
                        <div>
                            <Filter />
                        </div>


                    </div>
                    <div className=' border-2 border-green-500'>

                        <ProductCard />
                    </div>

                </div>

            </LayOut>

        </div>
    )
}

export default Home
