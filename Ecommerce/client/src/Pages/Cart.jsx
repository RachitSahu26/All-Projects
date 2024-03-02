
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

    // ...................deleting product from the cart.........
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
            <div className='bg-black h-screen pt-5'>
                <div className='bg-white flex flex-col md:flex-row m-5 rounded'>
                    {/* Left Column */}
                    <div className='md:w-1/2 p-4'>
                        <h4>Continue Shopping</h4>
                        <hr className='border-white' />
                        <div className='p-3'>
                            <h2>Shopping Cart</h2>
                            <p>You have {cartItem.length} items in your cart</p>
                        </div>

                        <div className=' p-3'>
                            {cartItem.map((item) => (
                                <div className='card-body border-2 border-black rounded-lg m-3 p-3' key={item._id}>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center'>
                                            {/* <div>
                                            <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp' className='rounded-3' alt='Shopping item' style={{ width: '65px' }} />
                                        </div> */}
                                            <div className='ms-3'>
                                                <h5>{item.name}</h5>
                                                <p className='small mb-0'>{item.description}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center'>
                                            <button onClick={() => handleDecrement(item.id)} className='px-2'>-<i className='fas fa-minus'></i></button>
                                            <div style={{ width: '50px' }}>
                                                <h5 className='fw-normal mb-0'>{item.quantity}</h5>
                                            </div>
                                            <button onClick={() => handleIncrement(item.id)} className='px-2 '> +<i className='fas fa-plus'></i></button>
                                            <div style={{ width: '80px' }}>
                                                <h5 className='mb-0'>${item.price}</h5>
                                            </div>
                                            <button onClick={() => deleteCart(item._id)} className='text-white bg-red-600 p-2 rounded-lg '>Remove Item <i className='fas fa-trash-alt'></i></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>




                    <div className='flex justify-center flex-col w-full p-2'>


                        {/* ...............................sdfdsfsd.............. */}
                        <div className=" border-2 border-red-600 h-[30] max-h-auto rounded-lg  bg-white p-6 shadow-md md:mt-0 md:w-1/3" >
                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700" >Subtotal</p>
                                <p className="text-gray-700" >${totalAmount}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="text-gray-700" >Shipping</p>
                                <p className="text-gray-700" >₹{shipping}</p>
                            </div>

                            <hr className="my-4" />

                            <div className="flex justify-between mb-3">
                                <p className="text-lg font-bold" >Total</p>
                                <div className>
                                    <p className="mb-1 text-lg font-bold" >₹{grandTotal}</p>
                                </div>
                            </div>

                        </div>













                        {/* Right Column */}

                        <div>
                            <h2>Checkout</h2>
                            {clientToken && (
                                <DropIn
                                    options={{ authorization: clientToken }}
                                    onInstance={setInstance}
                                />
                            )}
                            <button className='bg-green-400 p-2 border-2 border-black rounded-lg' onClick={handlePayment} disabled={!clientToken || loading || !auth?.token}>
                                {loading ? 'Processing...' : 'Complete Payment'}
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </LayOut>



    )
}

export default Cart







