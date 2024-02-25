import React, { useContext, useEffect } from 'react'
import LayOut from '../../Components/Layout/LayOut'
import Sidebar from '../../Components/SideBar/AdminSideBar'
import mycontext from '../../Context/myContext';
import ProductCard from '../../Components/Product Card/ProductCard';
import { Link } from 'react-router-dom';

function AllProduct() {


    const contextData = useContext(mycontext);
    const { getAllProduct,allProduct} = contextData

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

                    <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {allProduct.map((item) => (


                            <Link to={`/dashboard/admin/product/${item.slug}`} key={item._id}>

                                <div className="bg-white rounded-lg shadow-md">
                                    {/* Remove the image part if you're not using images */}
                                    {/* <img src={item.image} className="card-img-top" alt={item.name} /> */}

                                    <div className="card-body p-4">
                                        <h5 className="text-xl font-bold mb-2">{item.name}</h5>
                                        <p className="text-gray-600 mb-4">Price: ${item.price}</p>
                                        <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>
                                        <p className="text-gray-600 mb-4">Category: {item.category}</p>
                                        <p className="text-gray-600 mb-4">Description: {item.description}</p>

                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, e.target.value)}
                                            className="border border-gray-300 rounded px-3 py-2"
                                        />

                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>
                </div>


            </div>
        </LayOut>



    )
}

export default AllProduct
