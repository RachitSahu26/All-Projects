import { useState } from 'react'; // Import useState hook if not already imported
import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import axios from 'axios';
// import layOut from '../Components/Layout/LayOut.jsx'
import toast from 'react-hot-toast';
import LayOut from '../Components/Layout/LayOut.jsx';
// import { Toast } from 'react/-toastify/dist/components';
function SignUp() {
    // Initialize state variables for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    // //* navigate
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        registerHandle();


        // Perform form submission logic here
    };




    const registerHandle = async () => {

        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', {
                email,
                password,
                phone,
                address,
                name
            });

            if (response.data.success) {
                toast.success("successful")
                console.log(response.data.message)
            } else {
                console.log(response.data.message)
                toast.error("failed")
            }

            setEmail("");
            setPassword("");
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    };









    return (
        <LayOut>
            <div className="flex justify-center bg-black items-center h-screen">
                <form onSubmit={handleSubmit} className="bg-[#d2cbbf]  border-2 border-teal-500 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 sm:w-1/3  ">
                    <h2 className="text-2xl mb-4 font-bold text-gray-800">Sign Up</h2>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="shadow  appearance-none  border-2 border-teal-500    rounded-lg w-full py-2 px-3 bg-[#beb9b1] text-black placeholder:text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="shadow appearance-none  border-teal-500   bg-[#beb9b1] text-black placeholder:text-black  border-2 rounded-lg w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="shadow appearance-none border-2 border-teal-500 rounded-lg w-full py-2 px-3 bg-[#beb9b1] text-black placeholder:text-black  leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="PhoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                        <input
                            type="number"
                            id="PhoneNumber"
                            name="PhoneNumber"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone Number"
                            className="shadow appearance-none     border-2 border-teal-500 rounded-lg  w-full py-2 px-3  bg-[#beb9b1] text-black placeholder:text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="Address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                        <input
                            type="text"
                            id="Address"
                            name="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Please enter your address"
                            className="shadow appearance-none   bg-[#beb9b1]  border-2 border-teal-500 rounded-lg    placeholder:text-black   text-black w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-between">

                        <button

                            className=' bg-black w-full text-white font-bold    duration-300 ease-in-out transform hover:scale-90  px-2 py-2 rounded-lg'>
                            Sign Up
                        </button>



                        <Link to="/signin" className="text-red-800 font-bold p-5 ">Already have an account?</Link>
                    </div>





                </form>
            </div>



        </LayOut>
    );
}

export default SignUp;
