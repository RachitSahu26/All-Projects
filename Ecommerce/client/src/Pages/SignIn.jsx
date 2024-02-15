import axios from 'axios';
import { useContext, useState } from 'react';
// import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import mycontext from '../Context/myContext';

function Login() {

    const ContextData = useContext(mycontext)
    const { auth, setAuth } = ContextData;
    //* creating two useState
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //* navigate
    const navigate = useNavigate();


    const loginHandle = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const loginData = await res.json();

            if (res.ok) {
                // Login successful
                toast.success('Login successful!');



                setAuth({
                    ...auth,
                    token: loginData.token
                })

                localStorage.setItem("auth", JSON.stringify(loginData.token));
                console.log(loginData)
                navigate("/")
            } else {
                // Login failed
                toast.error("Login Failed");
            }
        } catch (error) {
            // Error occurred during login
            console.error('Error occurred during login:', error);
            toast.error('Failed to log in. Please try again later.');
        }
    };

    return (
        <div className=' flex justify-center items-center h-screen'>

            {/* main div  */}
            <div className=' bg-[#d2cbbf] shadow-md px-10 py-10 rounded-xl '>

                {/* Top Heading  */}
                <div className="">
                    <h1 className='text-center text-black text-xl mb-4 font-bold'>Login</h1>
                </div>

                {/* Input 1 Email  */}
                <div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name='email'
                        className=' bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Email'
                    />
                </div>

                {/* Input 2 Password  */}
                <div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className='bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Password'
                    />
                </div>

                {/* Button For Login  */}
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={loginHandle}
                        className=' bg-green-700 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>

                {/* Link for Signup  */}
                <div>
                    <h2 className='text-black'>Don't have an account <Link className=' text-red-700 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login