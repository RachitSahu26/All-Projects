import { useState } from 'react'; // Import useState hook if not already imported
import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import axios from 'axios';
import toast from 'react-hot-toast';
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

           if(response.data.success){
            toast.success("successful")
            console.log(response.data.message)
           }else{
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
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 border-2 border-black">
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign Up
                    </button>
                    <h3 className="text-blue-900">Sign In........... </h3>
                    {/* Assuming Link component is imported properly */}
                    <Link to="/signin" className="text-blue-900">Click here</Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
