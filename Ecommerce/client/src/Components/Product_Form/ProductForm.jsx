import React, { useContext, useEffect, useState } from 'react';
import mycontext from '../../Context/myContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const ProductFrom = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState(false); // Use boolean for shipping
    const [selectedOption, setSelectedOption] = useState('');
    const [imageUrl, setImageUrl] = useState('')



    // ...........................Use Navigate....................

const navigate=useNavigate();


    // Context API
    const contextData = useContext(mycontext);
    const { categories, getAllCategory, auth } = contextData;
    
    useEffect(() => {
        getAllCategory();
    }, []);

    const productAddedHandle = async () => {
        try {
            const { data } = await axios.post("http://localhost:3000/api/product/create-product", {
                name,
                price: parseFloat(price),
                description,
                quantity: parseInt(quantity),
                shipping,
                category: selectedOption,
                 image:imageUrl
            }, {
                headers: {
                    Authorization: auth?.token,
                },
            });

            if (data?.success) {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/product")
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error("Something went wrong");
        }
    }



  



    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <div className="space-y-4 bg-teal-500 p-4 rounded-xl">
                <div>
                    <label className="block">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block">Price:</label>
                    <input
                        type="number" // Use type="number" to accept only numeric values
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block">Description:</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block">Quantity:</label>
                    <input
                        type="number" // Use type="number" to accept only numeric values
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block">Shipping:</label>
                    <input
                        type="checkbox" // Use checkboxes for boolean values
                        name="shipping"
                        checked={shipping}
                        onChange={(e) => setShipping(e.target.checked)}
                    />
                </div>
{/* ...........................image adding............... */}
<div>
                    <label className="block">Product Image URL:</label>
                    <input
                        type="text" // Use type="text" for accepting text input
                        name="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)} // Handle changes in the image URL
                        className="w-full border rounded px-3 py-2"
                    />
                </div>


                <div>
                    <label className="block">Category:</label>
                    <select
                        id="options"
                        value={selectedOption}
                        onChange={handleOptionChange}
                        className="w-full border rounded text-black px-3 py-2"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={productAddedHandle} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                    Create Product
                </button>
            </div>
        </div>
    );
};

export default ProductFrom;
