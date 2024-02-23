import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../../Components/Layout/LayOut.jsx';
import Sidebar from '../../Components/SideBar/AdminSideBar.jsx';
import mycontext from '../../Context/myContext.jsx';
import { useLinkClickHandler, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
// import ProductForm from '../../Components/Product_Form/ProductForm.jsx';

const UpdateProduct = () => {




    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState(false); // Use boolean for shipping
    const [selectedOption, setSelectedOption] = useState('');
    const [id, setId] = useState('');
    const [category, setCategory] = useState('');


    // .....................use useParams...........
    const params = useParams();

const navigate=useNavigate();

    // Context API
    const contextData = useContext(mycontext);
    const { categories, getAllCategory, auth } = contextData;


    // ....................get single Product...........


    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:3000/api/product/get-product/${params.slug}`
            );
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
            setSelectedOption(data.product.selectedOption._id);
        } catch (error) {
            console.log(error);
        }
    };









    // ............................updateHandler......
    const productUpdateHandle = async () => {
        try {
            const { data } = await axios.put(`http://localhost:3000/api/product/update-product/${id}`, {
                name,
                price: parseFloat(price),
                description,
                quantity: parseInt(quantity),
                shipping,
                category: selectedOption
            }, {
                headers: {
                    Authorization: auth?.token,
                },
            });

            if (data?.success) {
                toast.success("Product Updated Successfully");
                navigate("/dashboard/admin/product");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error("Something went wrong");
        }
    }
    // ..............................delete product Handler...............



    const productDeleteHandle = async () => {

        try {
            const { data } = await axios.delete(`http://localhost:3000/api/product/delete-product/${id}`);

            if (data?.success) {
                toast.success("Product Deleted Successfully");
                navigate("/dashboard/admin/product");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error('Error Deleting product:', error);
            toast.error("Something went wrong");
        }
    }





    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    // ....................useEffet ..........
    useEffect(() => {
        getSingleProduct();
        getAllCategory();
    }, []);

    return (
        <LayOut>
            <div className='border-2 border-yellow-700 flex flex-row'>
                <div>
                    <Sidebar />
                </div>
                <div className='bg-red-100 w-[90%] justify-center'>

                    <div className='bg-yellow-200 p-5'>
                        <h1>Update form</h1>

                        {/* ...........................updateFrom............. */}

                        <div className="max-w-md mx-auto mt-8">
                            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
                            <div className="space-y-4 bg-pink-500 p-4 rounded-xl">
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
                                <button onClick={productUpdateHandle} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                                    Update Product
                                </button>

                                {/* .....detlete btn...... */}
                                <button onClick={productDeleteHandle} className="bg-red-500 hover:bg-red-600 text-white ml-5 font-semibold px-4 py-2 rounded">
                                    Delete Product
                                </button>

                            </div>
                        </div>




                        {/* .........................end updateForm........ */}
                    </div>
                </div>
            </div>
        </LayOut>
    );
};

export default UpdateProduct;
