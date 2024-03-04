
import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../Components/Layout/LayOut'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { removeToCart } from '../Redux/Slice/CartSlice';
import { toast } from 'react-toastify';
// import LayOut from '../Components/Layout/LayOut.jsx'
import DropIn from "braintree-web-drop-in-react";
import mycontext from '../Context/myContext';
import axios from 'axios';


function Cart() {

    const cartItem = useSelector((state) => state.cart);
    const contextData = useContext(mycontext)

    const { auth } = contextData;

    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate()


    const deleteCart = (productId) => {
        console.log("Deleting product with ID:", productId);
        dispatch(removeToCart(productId));
        toast.success("Item removed from cart successfully");
    }


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItem));
    }, [cartItem])


    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        let temp = 0;
        cartItem.forEach((cartItem) => {
            temp = temp + parseInt(cartItem.price)
        })
        setTotalAmount(temp);
        // console.log(temp)
    }, [cartItem])



    const handleIncrement = (id) => {
        // Implement increment logic
    };

    const handleDecrement = (id) => {
        // Implement decrement logic
    };






    useEffect(() => {
        // Fetch client token from your server
        const fetchClientToken = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/product/braintree/token');
                setClientToken(response.data.clientToken);
                console.log(response.data.clientToken)
            } catch (error) {
                console.error('Error fetching client token:', error);
            }
        };

        fetchClientToken();
    }, [auth?.token]);




    const handlePayment = async () => {
        if (!instance) return;

        setLoading(true);
        try {
            const { nonce } = await instance.requestPaymentMethod();
            const response = await axios.post('http://localhost:3000/api/product/braintree/payment', { nonce, cartItem });
            console.log('Payment successful:', response.data);
            // Handle success response
        } catch (error) {
            console.error('Payment error:', error.response.data);
            // Handle error response
        } finally {
            setLoading(false);
        }



    }

    let shipping = parseInt(100);
    const grandTotal = shipping + totalAmount


    return (



        <LayOut>

            <div class="min-h-screen bg-gray-100 pt-20">
                <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>


                <div class="mx-auto max-w-5xl flex justify-center px-6 md:flex md:space-x-6 xl:px-0">

                    <div class="rounded-lg md:w-2/3">

                        { cartItem.map((item) => (

                                <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">

                                    <img
                                        src={`http://localhost:3000/api/product/product-photo/${item._id}`}
                                        className="card-img-top w-[20%] h-[20%] rounded-lg"
                                        alt={item.name}
                                    />

                                    <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div class="mt-5 sm:mt-0">
                                            <h2 class="text-lg font-bold text-gray-900">{item.name}</h2>
                                            <p class="mt-1 text-xs text-gray-700">${item.price}</p>
                                            <p class="mt-1 text-xs text-gray-700">${item.description.slice(0, 50)}${item.description.length > 50 ? '...' : ''}</p>


                                        </div>
                                        <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <div class="flex items-center border-gray-100">
                                                <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                                <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
                                                <span class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                            </div>
                                            <div class="flex items-center space-x-4">

                                            <button onClick={() => deleteCart(item._id)} className='text-white bg-red-600 p-2 rounded-lg '>Remove Item <i className='fas fa-trash-alt'></i></button>
                          
                                            </div>
                                        </div>
                                    </div>
                                </div>






                            ))}

                    </div>
                
                
                    <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div class="mb-2 flex justify-between">
                                <p class="text-gray-700">Subtotal</p>
                                <p class="text-gray-700">${totalAmount}</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="text-gray-700">Shipping</p>
                                <p class="text-gray-700">${shipping}</p>
                            </div>
                            <hr class="my-4" />
                            <div class="flex justify-between">
                                <p class="text-lg font-bold">Total</p>
                                <div class="">
                                    <p class="mb-1 text-lg font-bold">$134.98 USD</p>
                                    <p class="text-sm text-gray-700">including VAT</p>
                                </div>
                            </div>
                            <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                        </div>
                </div>

            </div>

        </LayOut>



    )
}

export default Cart







