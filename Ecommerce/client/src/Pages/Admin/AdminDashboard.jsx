import React from 'react'
import LayOut from '../../Components/Layout/LayOut.jsx'
import Sidebar from '../../Components/SideBar/AdminSideBar.jsx'


const AdminDashboard = () => {
  return (
    <LayOut>
      <div className='border-2  flex flex-row'>
        <div>

          <Sidebar />
        </div>



        <div className=' w-[90%] justify-center'>




          <h1> Admin Dashboard</h1>

        </div>


      </div>
    </LayOut>
  )
}

export default AdminDashboard
