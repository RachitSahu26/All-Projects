import React, { useContext, useEffect, useState } from 'react';
import mycontext from '../../Context/myContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductFrom = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    // const [name,setName]=useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');

    const [selectedOption, setSelectedOption] = useState('');



    // ........................context api.................. 
    const contextData = useContext(mycontext);
    const { categories, getAllCategory,auth,setAuth } = contextData;

// const navigate=useNavigate()

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const productAddedHandle = async () => {
        try {
            const { data } = await axios.post("http://localhost:3000/api/product/create-product", {
                name,
                price: parseFloat(price), // Convert price to a number
                description,
                shipping: Boolean(shipping), // Convert shipping to a boolean
                quantity: parseInt(quantity), // Convert quantity to a number if needed
                category: selectedOption // Provide the selected category as an ObjectId
            }, {
                headers: {
                    Authorization: auth?.token,
                },
            });
    
            if (data?.success) {
                toast.success("Product Created Successfully");
                console.log(data)
                // navigate("/dashboard/admin/products");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <div className="space-y-4  bg-teal-500 p-4 rounded-xl " >


                {/* .............................Name.............. */}

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


                {/* .............................price.............. */}

                <div>
                    <label className="block">Price:</label>
                    <input
                        type="text"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                {/* .............................description.............. */}

                <div>
                    <label className="block">Description:</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                {/* .............................quantity.............. */}

                <div>
                    <label className="block">Quantity:</label>
                    <textarea
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* .............................Shipping.............. */}

                <div>
                    <label className="block">Shipping:</label>
                    <textarea
                        name="Shipping"
                        value={shipping}
                        onChange={(e) => setShipping(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>


                {/* .............................Category.............. */}

                <div>
                    <label className="block">Category:</label>


                    <select
                        id="options"
                        value={selectedOption}
                        onChange={(e)=>setSelectedOption(e.target.value)}
                        className="w-full border rounded text-black px-3 py-2"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id}   value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>





                </div>
                {/* Add more fields as needed */}
                <button onClick={productAddedHandle} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                    Create Product
                </button>
            </div>
        </div>
    );
};

export default ProductFrom;
