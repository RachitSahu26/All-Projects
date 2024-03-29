import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import mycontext from '../Context/myContext.jsx';
import clsx from 'clsx';
function Login() {
    const ContextData = useContext(mycontext);
    const { auth, setAuth } = ContextData;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginHandle = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', {
                email,
                password
            }
                , {
                    headers: {
                        Authorization: auth?.token,
                    },
                }

            );


            if (res && res.data.success) {
                console.log(res.data.token)
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate("/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }




    }

    return (
        <div className=' flex justify-center items-center h-screen'>
            <div className=' bg-[#d2cbbf] shadow-md px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-black text-xl mb-4 font-bold'>Login</h1>
                </div>
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
                <div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className='bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={loginHandle}
                        className=' bg-green-700 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-black'>Don't have an account <Link className=' text-red-700 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login;
