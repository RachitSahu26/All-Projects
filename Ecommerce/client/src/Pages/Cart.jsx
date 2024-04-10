
import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../Components/Layout/LayOut'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { decrementQuantity, incrementQuantity, removeToCart } from '../Redux/Slice/CartSlice';
import { toast } from 'react-toastify';
// import LayOut from '../Components/Layout/LayOut.jsx'
// import DropIn from "braintree-web-drop-in-react";
import mycontext from '../Context/myContext';
import axios from 'axios';

// import { baseUrl } from '../../urls';


function Cart() {

    const cartItem = useSelector((state) => state.cart);
    const contextData = useContext(mycontext)

    const { auth,baseUrl } = contextData;

    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const [quantities, setQuantities] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const deleteCart = (productId) => {
       
        dispatch(removeToCart(productId));
   
   
        toast.success("Item removed from cart successfully",

        {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            style: {
                borderRadius: '10px', // Set border radius
            color:"red"

              },
            
        }

    );

    }


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItem));
    }, [cartItem])


    const [totalAmount, setTotalAmount] = useState(0);

    const handleIncrement = (id) => {
        // Increment quantity for the corresponding item ID
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: (prevQuantities[id] || 1) + 1, // Default quantity to 1 if not available
        }));
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        // Decrement quantity for the corresponding item ID, but keep it at least 1
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: Math.max((prevQuantities[id] || 1) - 1, 1), // Default quantity to 1 if not available
        }));
        // Implement decrement logic
        dispatch(decrementQuantity(id)); // Assuming you have a decrementQuantity action in your CartSlice
    };

    useEffect(() => {
        let temp = 0;
        cartItem.forEach((cartItem) => {
            // Multiply each item's price by its quantity and add to temp
            temp += cartItem.price * (quantities[cartItem._id] || 1); // Default quantity to 1 if not available
        });
        setTotalAmount(temp);
    }, [cartItem, quantities]);







    // useEffect(() => {
    //     // Fetch client token from your server
    //     const fetchClientToken = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3000/api/product/braintree/token');
    //             setClientToken(response.data.clientToken);
    //             console.log(response.data.clientToken)
    //         } catch (error) {
    //             console.error('Error fetching client token:', error);
    //         }
    //     };

    //     fetchClientToken();
    // }, [auth?.token]);




    // const handlePayment = async () => {
    //     if (!instance) return;

    //     setLoading(true);
    //     try {
    //         const { nonce } = await instance.requestPaymentMethod();
    //         const response = await axios.post('http://localhost:3000/api/product/braintree/payment', { nonce, cartItem });
    //         console.log('Payment successful:', response.data);
    //         // Handle success response
    //     } catch (error) {
    //         console.error('Payment error:', error.response.data);
    //         // Handle error response
    //     } finally {
    //         setLoading(false);
    //     }



    // }

    let shipping = parseInt(100);
    const grandTotal = shipping + totalAmount


    return (



        <LayOut>


            <div className="min-h-screen bg-black pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

                <div className="mx-auto pb-5 max-w-5xl flex flex-col justify-center px-6 md:flex-row md:space-x-6 xl:px-0">
                    {/* <!-- Cart Items --> */}
                    <div className="md:w-2/3 rounded m-2">
                        {cartItem.map((item,index) => (
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" key={index}>
                                <img src={`${baseUrl}/api/product/product-photo/${item._id}`} className="card-img-top w-1/4 h-auto rounded-lg mb-4 sm:mb-0 sm:w-1/6" alt={item.name} />
                                <div className="sm:ml-4 sm:flex sm:flex-col sm:w-full sm:justify-between">
                                    <div className="mt-5">
                                        <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                                        <p className="mt-1 text-xs text-gray-700">${item.price}</p>
                                        <p className="mt-1 text-xs text-gray-700">{item.description.slice(0, 50)}{item.description.length > 50 ? '...' : ''}</p>
                                    </div>
                                    <div className="mt-4 sm:mt-0">
                                        <div className="flex justify-between items-center border-gray-100">
                                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => handleDecrement(item._id)}>-</span>
                                            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={quantities[item._id] || 1} min="1" readOnly />
                                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => handleIncrement(item._id)}>+</span>
                                        </div>
                                        <button onClick={() => deleteCart(item._id)} className="mt-4 sm:mt-2 text-white bg-red-600 p-2 rounded-lg w-full">Remove Item <i className="fas fa-trash-alt"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <!-- Cart Summary --> */}
                    <div className="mt-6 md:mt-0 md:w-1/3 bg-white h-[50%] p-3 rounded-lg">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">${totalAmount}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">${shipping}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">${grandTotal}</p>
                                <p className="text-sm text-gray-700">including VAT</p>
                            </div>
                        </div>
                        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                    </div>
                </div>
            </div>

        </LayOut>



    )
}

export default Cart







