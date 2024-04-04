import React, { useContext } from 'react';
import { FaUser } from 'react-icons/fa';
import LayOut from '../../Components/Layout/LayOut.jsx'
import mycontext from '../../Context/myContext.jsx';
const UserProfile = ({ toggleMenu }) => {
  const ContextData = useContext(mycontext);
  const { auth } = ContextData;






  return (
    <LayOut>

      <div className="flex justify-center items-center flex-col bg-black text-white p-4">
        <div className="w-16 h-16 md:w-10 md:h-10 rounded-full border-2 border-teal-500 bg-gray-200 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-300 flex items-center justify-center">
          <FaUser className="text-xl md:text-lg" onClick={toggleMenu} />

        </div>

        <div>
          <h1> <p className="text-lg font-bold">Hii {auth?.user?.name}</p>
          </h1>
        </div>

        <div className="mt-2 border-2 border-teal-400 p-5 rounded-lg">
          <p className="text-lg font-bold">Name: {auth?.user?.name}</p>
          <p className="text-lg font-bold">Email: {auth?.user?.email}</p>
          <p className="text-lg font-bold">Mobile Number: {auth?.user?.phone}</p>
          <p className="text-lg font-bold">Address: {auth?.user?.address}</p>

          <p className="text-lg  text-red-600 font-bold">Role: {auth?.user?.role}</p>
          <p className="text-lg font-bold">User ID: {auth?.user?._id}</p>

        </div>
      </div>
    </LayOut>

  );
}

export default UserProfile;
