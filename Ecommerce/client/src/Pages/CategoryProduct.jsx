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

    const navigate = useNavigate();

    const params = useParams();

    const categoryBaseProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/product/category-base-product/${params.slug}`)

            setProduct(data?.products);
            setCategory(data?.category);
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

            <div className='border-2 border-green-500 h-screen p-2'>
                <div className="grid border-2 border-red-500 grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Product.map((item) => (
                        <div className="bg-white rounded-lg shadow-md" key={item._id}>
                            <Link to={`/dashboard/admin/product/${item.slug}`} >
                                <div className="card-body p-4">
                                    <h5 className="text-xl font-bold mb-2">{item.name}</h5>
                                    <p className="text-gray-600 mb-4">Price: ${item.price}</p>
                                    <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>
                                    {/* Render category name instead of category ID */}
                                    <p className="text-gray-600 mb-4">Category: {item.name}</p>
                                    <p className="text-gray-600 mb-4">Description: {item.description}</p>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                                        className="border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                            </Link>
                            <div className="flex justify-end p-4">
                                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                                    Add to cart
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </LayOut>
    )
}

export default CategoryProduct