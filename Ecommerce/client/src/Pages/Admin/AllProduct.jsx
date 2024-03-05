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


                <div className='bg-black w-[90%] justify-center'>
                    <h1>Product</h1>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
                   
                                      {allProduct.map((item) => (
                            <div className="max-w-sm bg-white border  m-5 p-5  border-gray-200 rounded-lg shadow">
                                <a href="#">
                                    <img className="rounded-lg" src={`http://localhost:3000/api/product/product-photo/${item._id}`} alt={item.name} />
                                </a>
                                <div className="p-5">
                                    <a href="#">
                                        <h3 className="text-lg font-bold text-black">{item.name}</h3>
                                    </a>
                                    <p className="mt-1 text-sm text-black line-clamp-3">{item.description}</p>
                                    <a href="#" className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Read more
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                        ))}

                    </div>
                </div>


            </div>
        </LayOut >



    )
}

export default AllProduct
