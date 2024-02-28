import React, { useEffect, useState } from 'react';
import LayOut from '../Components/Layout/LayOut';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const params = useParams();
    const [singleProduct, setSingleProduct] = useState(null);

    // Function to fetch single product data
    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/product/get-product/${params.slug}`);
            setSingleProduct(response.data.product);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    useEffect(() => {
        if (params.slug) {
            getProduct();
        }
    }, [params.slug]);

    return (
        <LayOut>
            <div className="container mx-auto py-8">
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    {singleProduct && (
                        <div className="md:flex">
                            <div className="p-8">
                                <h2 className="text-2xl font-bold mb-4">{singleProduct.name}</h2>
                                <p className="text-gray-600 mb-4">Price: ${singleProduct.price}</p>
                                <p className="text-gray-600 mb-4">Quantity: {singleProduct.quantity}</p>
                                <p className="text-gray-600 mb-4">Category: {singleProduct.categories}</p>
                                <p className="text-gray-600 mb-4">Description: {singleProduct.description}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </LayOut>
    );
}

export default ProductDetail;
