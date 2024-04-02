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
    const [photo, setPhoto] = useState('')



    // ...........................Use Navigate....................

    const navigate = useNavigate();


    // Context API
    const contextData = useContext(mycontext);
    const { categories, getAllCategory, auth } = contextData;

    useEffect(() => {
        getAllCategory();
    }, []);


    // ..............adding product  handler...............
    const productAddedHandle = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', parseFloat(price));
            formData.append('description', description);
            formData.append('quantity', parseInt(quantity));
            formData.append('shipping', shipping);
            formData.append('category', selectedOption);
            formData.append('photo', photo); // Append the image file

            const { data } = await axios.post("http://localhost:3000/api/product/create-product", formData, {
                headers: {
                    Authorization: auth?.token,
                    'Content-Type': 'multipart/form-data', // Set the correct content type for file uploads
                },
            });

            // Handle response...

            if (data?.success) {
                toast.success("Product Created Successfully");
                // navigate("/dashboard/admin/product")
            } else {
                toast.error(data?.message);
            }


        } catch (error) {
            console.error('Error creating product:', error);
            toast.error("Something went wrong");
        }
    };




    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="md:w-1/2 mx-auto   p-3   mt-8">
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <div className="space-y-4  text-white  border-2 border-teal-400 p-4 rounded-xl">
                <div >
                    <label className="block">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded px-3 py-2 text-black"
                    />
                </div>

                <div>
                    <label className="block">Price:</label>
                    <input
                        type="number" // Use type="number" to accept only numeric values
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border rounded px-3 py-2 text-black"
                    />
                </div>

                <div>
                    <label className="block">Description:</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded px-3 py-2 text-black"
                    />
                </div>

                <div>
                    <label className="block">Quantity:</label>
                    <input
                        type="number" // Use type="number" to accept only numeric values
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full border rounded px-3 py-2 text-black"
                    />
                </div>

                <div>
                    <label className="block">Shipping:</label>
                    <input
                        type="checkbox" // Use checkboxes for boolean values
                        name="shipping"
                        checked={shipping}
                        onChange={(e) => setShipping(e.target.checked)}
                        className='text-black'
                    />
                </div>
                {/* ...........................image adding............... */}

                <div className="mb-3">
                    <label className="border border-gray-300 bg-green-400 text-black rounded-md p-2 block text-center cursor-pointer">
               
                        {photo ? photo.name : "Upload Photo"}
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            className="hidden text-black"
                        />
                    </label>
                </div>

                {photo && (
                    <div className="text-center">
                        <img
                            src={URL.createObjectURL(photo)}
                            alt="product_photo"
                            className="h-48 object-contain mx-auto"
                        />
                    </div>
                )}



                {/* .................category............. */}
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



                {/* ...........create product/ btn.......... */}

                <button onClick={productAddedHandle} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                    Create Product
                </button>


            </div>
        </div>



    );
};

export default ProductFrom;
