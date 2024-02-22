import React, { useContext, useEffect } from 'react'
import LayOut from '../../Components/Layout/LayOut'
import Sidebar from '../../Components/SideBar/AdminSideBar'
import mycontext from '../../Context/myContext';
import ProductCard from '../../Components/Product Card/ProductCard';

function AllProduct() {


    const contextData = useContext(mycontext);
    const { getAllProduct } = contextData

    useEffect(() => {
        getAllProduct();
    }, [])

    return (


        <LayOut>
            <div className='border-2 border-yellow-700 flex flex-row'>
                <div>
                    <Sidebar />
                </div>


                <div className='bg-red-100 w-[90%] justify-center'>
                    <h1>Product</h1>
               <ProductCard/>

                </div>


            </div>
        </LayOut>



    )
}

export default AllProduct
