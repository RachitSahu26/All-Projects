import React, { useContext, useEffect, useState } from 'react';
import mycontext from '../../Context/myContext';

const ProductForm = () => {


    const contextData = useContext(mycontext);
    const { categories, setCategories, getAllCategory } = contextData
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        // Add more fields as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here, e.g., send data to server
        console.log('Form submitted:', productData);
        // Reset form fields after submission
        setProductData({
            name: '',
            price: '',
            description: '',
            category: '',
        });
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block">Price:</label>
                    <input
                        type="text"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block">Description:</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block">Category:</label>
                    <select
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        {
                            categories?.map((cate) => (
                                <option key={cate.id}></option>
                            ))


                        }
                        {/* Add more options as needed */}
                    </select>
                </div>
                {/* Add more fields as needed */}
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
