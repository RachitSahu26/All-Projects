import React, { useContext } from 'react'
import LayOut from '../../Components/Layout/LayOut'
import mycontext from '../../Context/myContext';
// import Sidebar from '../../Components/SideBar/AdminSideBar';
// import UserSideBar from '../../Components/SideBar/UserSideBar';

function UserDashboard() {

  const ContextData = useContext(mycontext)
  const { auth, setAuth } = ContextData;
  return (
    <LayOut>
    <div className='border-2 border-yellow-700 '>
    

      <div className='bg-red-100 w-[90%] justify-center'>




        <h1> Admin Dashboard</h1>

      </div>


    </div>
  </LayOut>
  )
}

export default UserDashboard
