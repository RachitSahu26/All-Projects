import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../../Components/Layout/LayOut'
import Sidebar from '../../Components/SideBar/AdminSideBar'
import mycontext from '../../Context/myContext';
import ProductCard from '../../Components/Product Card/ProductCard';
import { Link } from 'react-router-dom';

function AllProduct() {

    const [photoUrl, setPhotoUrl] = useState([])
    const contextData = useContext(mycontext);
    const { getAllProduct, allProduct } = contextData

    useEffect(() => {
        console.log(allProduct)
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

                    <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {allProduct.map((item) => (



                            <>

                                <a class="flex flex-col group bg-white  shadow-sm border-2 border-green-500 rounded-xl overflow-hidden hover:shadow-lg transition dark: dark:border-gray-700 dark:shadow-slate-700/[.7]" href="#">
                                    <div class="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden">

                                        <img
                                            src={`http://localhost:3000/api/product/product-photo/${item._id}`}
                                            className="card-img-top"
                                            alt={item.name}
                                        />

                                    </div>
                                    <div class="p-4 md:p-5">
                                        <h3 class="text-lg font-bold text-gray-800 dark:text-white">
                                            {item.name}
                                        </h3>
                                        <p class="mt-1 text-gray-500 dark:text-gray-400">
                                            {item.description}

                                        </p>
                                    </div>
                                </a>

                            </>



                        ))}
                    </div>
                </div>


            </div>
        </LayOut >



    )
}

export default AllProduct
