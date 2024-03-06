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

                       




                        {/* .........................end updateForm........ */}
                    </div>
                </div>
            </div>
        </LayOut>
    );
};

export default UpdateProduct;
