import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../../Components/Layout/LayOut'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../Components/Spinner/Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import mycontext from '../../Context/myContext';

function AdminProductDetail() {


    // .............state............
    const [singleProduct, setSingleProduct] = useState([])
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editProduct, setEditProduct] = useState({})



    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    // const [photo, setPhoto] = useState(null)
    const [id, setId] = useState("");
    const [category, setCategory] = useState("");

    //   ................navigation and param.....
    const params = useParams();
    const navigate = useNavigate()


    // ..............fetching another context ............
    const contextData = useContext(mycontext);
    const { auth, categories } = contextData


    // Function to fetch single product data
    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/product/get-product/${params.slug}`);
            const { product } = response.data;

            setSingleProduct(product);
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setShipping(product.shipping);
            setQuantity(product.quantity);
            setSelectedOption(product.selectedOption);
            setId(product._id);
            // setPhoto(product.photo);
            setCategory(product.category._id);
            console.log(product._id)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setLoading(false);

        }
    };



    // .....................Delete handleDelete.apply..............
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:3000/api/product/delete-product/${id}`,
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );

            if (data.success) {
                toast.success(`Product is deleted`);
                navigate(`/dashboard/admin/all-product`);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };









    // ................open the model Handler...........

    const handleEdit = (id) => {
        setEditProduct(id)
        setShowModal(true);
    }


    // ................close the model Handler...........
    const handleCloseModal = () => {
        setEditProduct({});
        setShowModal(false);
    };
    // ..................category Handler.........
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };





    useEffect(() => {

        getProduct()

    }, [params.slug])

    if (loading) {
        return (<div className="flex justify-center items-center h-screen">
            <Spinner />
        </div>)
    }

    return (
        <LayOut>
            <h1 className='text-white'>

                AdminProductDetail
            </h1>





            <div className="container mx-auto py-8">
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    {singleProduct && (
                        <div className="md:flex">
                            <div className="p-8">
                                <img className="rounded-lg" src={`http://localhost:3000/api/product/product-photo/${singleProduct._id}`} alt={singleProduct.name} />

                                <h2 className="text-2xl font-bold mb-4">{singleProduct.name}</h2>
                                <p className="text-gray-600 mb-4">Price: ${singleProduct.price}</p>
                                <p className="text-gray-600 mb-4">Quantity: {singleProduct.quantity}</p>
                                <p className="text-gray-600 mb-4">Category: {singleProduct.categories}</p>
                                <p className="text-gray-600 mb-4">Description: {singleProduct.description}</p>

                                <div className=' flex '>


                                    <div>
                                        <button className='bg-green-500 p-3 rounded-lg' onClick={() => handleEdit(singleProduct._id)}  >Edit</button>
                                    </div>
                                    <div className='ml-5'>
                                        <button className='bg-red-500 p-3 rounded-lg' onClick={() => handleDelete(singleProduct._id)}  >Delete</button>
                                    </div>

                                </div>


                            </div>


                        </div>
                    )}
                </div>


                ...............................update product
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

                        <div className="max-w-md mx-auto mt-8">
                            <h2 className="text-xl  text-white font-semibold mb-4">Update Product</h2>
                            <div className="space-y-4 bg-pink-500 p-4 rounded-xl">




                                {/* .....................Update Name............. */}
                                <div>
                                    <label className="block">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        className="w-full border rounded px-3 py-2"
                                    // readOnly // Make the input read-only
                                    />
                                </div>










                                {/* .....................Update Price............ */}
                                <div>
                                    <label className="block">Price:</label>
                                    <input
                                        type="number" // Use type="number" to accept only numeric values
                                        name="price"
                                        value={price}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>



                                {/* .....................Update Description............. */}
                                <div>
                                    <label className="block">Description:</label>
                                    <textarea
                                        name="description"
                                        value={description}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>




                                {/* .....................Update Quantity............. */}
                                <div>
                                    <label className="block">Quantity:</label>
                                    <input
                                        type="number" // Use type="number" to accept only numeric values
                                        name="quantity"
                                        value={quantity}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>



                                {/* ..................... Update Shipping ............. */}
                                <div>
                                    <label className="block">Shipping:</label>
                                    <input
                                        type="checkbox" // Use checkboxes for boolean values
                                        name="shipping"
                                        checked={shipping} // Sample static value
                                    />
                                </div>




                                {/* .....................Update Category............. */}
                                <div>
                                    <label className="block">Category:{singleProduct._id}</label>
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




                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                                    Update Product
                                </button>




                                {/* .....detlete btn...... */}
                                <button type="button" onClick={handleCloseModal} className="bg-red-500 text-white font-semibold px-4 py-2 rounded">Cancel</button>


                            </div>
                        </div>
                    </div>

                )}





            </div>

        </LayOut>
    )
}

export default AdminProductDetail
