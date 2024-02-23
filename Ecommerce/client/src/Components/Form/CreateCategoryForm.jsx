import React, { useContext, useState } from 'react'
import mycontext from '../../Context/myContext'
import { toast } from 'react-toastify';
import axios from 'axios';

function CreateCategoryForm() {

    const [name, setName] = useState('');
    const contextData = useContext(mycontext)
    const { auth, getAllCategory } = contextData;
    // ..................create category...............
    const categoryHandle = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:3000/api/category/create-category",
                {
                    name
                },
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form");
        }
    };

    return (
        <div className='bg-teal-200 flex flex-col justify-center items-center p-5 rounded-lg border-4 border-red-500' >
            <h2 className='text-2xl font-semibold mb-4'>Add New Category</h2>
            <div className='w-full max-w-sm'  >
                <div className='flex items-center border-b-2 border-teal-500 py-2'>
                    <input value={name}
                        onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Your Category Name' className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none' />
                    <button onClick={categoryHandle} className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                        Submit
                    </button>
                </div>
            </div>
        </div>

    )
}

export default CreateCategoryForm