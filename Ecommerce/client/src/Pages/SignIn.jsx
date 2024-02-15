import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
// import axios from 'axios';
function Signup() {

    //* creating three useState
    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //* navigate
    const navigate = useNavigate();

    const signupHandle = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", {
                email,
                password
            })



        } catch (error) {
            console.log(error);
        }
    }







    return (
        <div className='flex justify-center items-center h-screen'>
            <form
                className='bg-[#d2cbbf] shadow-md px-10 py-10 rounded-xl'
                onSubmit={(e) => {
                    e.preventDefault(); // Prevents the default form submission behavior
                    signupHandle();
                }}
            >
                {/* ... Other input fields */}






                {/* Top Heading  */}
                <div className="">
                    <h1 className='text-center text-black text-xl mb-4 font-bold'>Signup</h1>
                </div>






                {/* Input 2 Email  */}
                <div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name='email'
                        className=' bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Email'
                    />
                </div>







                <div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className='bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Password'
                    />
                </div>

                <div className='flex justify-center mb-3'>
                    <button
                        type="submit" // Specify the button type as "submit"
                        className='bg-red-700 w-full text-white font-bold px-2 py-2 rounded-lg'
                    >
                        Signup
                    </button>
                </div>

                {/* ... Other form elements */}
            </form>
        </div>
    );






}


export default Signup