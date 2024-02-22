import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../../Components/Layout/LayOut'
import Sidebar from '../../Components/SideBar/AdminSideBar'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import mycontext from '../../Context/myContext';
import { toast } from 'react-toastify';


function UpdateProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [id, setId] = useState('');
    const [selectedOption, setSelectedOption] = useState('');



    // .....................context API data................
    const contextData = useContext(mycontext);
    const { categories, setCategories, getAllCategory,auth } = contextData


    const params = useParams();



    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/product/get-product/${params.slug}`);

            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);

            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);

        } catch (error) {
            console.log(error);
        }
    }


    // ...................update  product handler...........
    //create product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {


            const { data } = axios.put(
                `http://localhost:3000/api/product/update-product/${id}`, {
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
            }

            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Product Updated Successfully");
                // navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };



    useEffect(() => {
        getAllCategory();
        getSingleProduct();
    }, [])


    return (
        <LayOut>
            <div className='border-2 border-yellow-700 flex flex-row'>
                <div>
                    <Sidebar />
                </div>
                <div className='bg-red-100 w-[90%] justify-center'>

                    <div className='bg-yellow-200 p-5'>
                        <h1>Update Product</h1>
                        {/* ..................................Update Form...................  */}


                        <div className="max-w-md mx-auto mt-8">
                            <h2 className="text-xl font-semibold mb-4">Update Product</h2>
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
                                        onChange={(e) => setSelectedOption(e.target.value)}
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







                                {/* Add more fields as needed */}
                                <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                                    Update Product
                                </button>
                            </div>
                        </div>

                        {/* ..................................End Form...................  */}

                    </div>
                </div>
            </div>
        </LayOut>
    )
}

export default UpdateProduct