import React, { useEffect, useState } from 'react'
import LayOut from '../Components/Layout/LayOut'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import ProductCard from '../Components/Product Card/ProductCard';
import Spinner from '../Components/Spinner/Spinner';

function CategoryProduct() {

    const [Product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [CategoryName, setCategoryName] = useState('')
    const navigate = useNavigate();

    const params = useParams();

    const categoryBaseProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/product/category-base-product/${params.slug}`)

            setProduct(data?.products);
            setCategory(data?.category);
            // setCategoryName(response.data.name);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }



    useEffect(() => {
        if (params?.slug) {

            categoryBaseProduct();
        }

    }, [params?.slug])



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        )
    }


    return (
        <LayOut>


            CategoryProduct

            <div className='border-2 border-green-500  h-[50%] p-2'>
                <h2 className='text-white text-center text-5xl p-5'>Category:{category.name} </h2>


                <div className="flex justify-center">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
                        {Product.map((item) => (
                            <div className="max-w-sm bg-white border m-5 p-5 border-gray-200 rounded-lg shadow">
                                <img className="rounded-lg" src={`http://localhost:3000/api/product/product-photo/${item._id}`} alt={item.name} />
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-black">{item.name}</h3>
                                    <p className="mt-1 text-sm text-black line-clamp-3">{item.description}</p>
                                    <button onClick={() => navigate(`/product/${item.slug}`)} className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Read more
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>




            </div>


        </LayOut>
    )
}

export default CategoryProduct