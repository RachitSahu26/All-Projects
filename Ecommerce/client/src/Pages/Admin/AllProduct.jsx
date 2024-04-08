import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../../Components/Layout/LayOut';
import Sidebar from '../../Components/SideBar/AdminSideBar';
import mycontext from '../../Context/myContext';
import ProductCard from '../../Components/Product Card/ProductCard';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Slice/CartSlice';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../urls';

function AllProduct() {
    const [photoUrl, setPhotoUrl] = useState([]);
    const contextData = useContext(mycontext);
    const { getAllProduct, allProduct } = contextData;
    const dispatch = useDispatch(); // Move useDispatch hook here

    useEffect(() => {
        console.log(allProduct);
        getAllProduct();
    }, []);

    const addCartItem = (product) => {
        dispatch(addToCart(product)); // Use dispatch here
        toast.success("Product Added");
    };

    return (
        <LayOut>
            <div className='border-2 border-yellow-700 flex justify-center flex-row'>
                <div>
                    <Sidebar />
                </div>

                <div className='bg-black w-[100%] justify-center'>
                    <h1>Product</h1>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
                        {allProduct.map((item, index) => (
                            <div key={index} className="max-w-sm bg-white border h-[95%] max-h-[auto] m-2 p-2 border-gray-500 rounded-lg shadow">
                                <Link to={`/product/${item.slug}`}>
                                    <img className="rounded-lg" src={`${baseUrl}/api/product/product-photo/${item._id}`} alt={item.name} />
                                </Link>
                                <div>
                                    <h3 className="text-lg  font-bold text-black">{item.name}</h3>
                                    <p class="mt-1 text-xs text-gray-700">${item.description.slice(0, 30)}${item.description.length > 30 ? '...' : ''}</p>
                                    <p className="mt-1 text-lg text-black line-clamp-3">${item.price}</p>
                                    <div className="flex justify-center mt-3 m-1">
                                        <button onClick={() => addCartItem(item)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LayOut>
    );
}

export default AllProduct;
