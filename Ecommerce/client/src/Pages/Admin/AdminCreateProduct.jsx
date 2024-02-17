import React from 'react'
import LayOut from '../../Components/Layout/LayOut'
import Sidebar from '../../Components/SideBar/SideBar'

const AdminCreateProduct = () => {
  return (
    <LayOut>
      <div className='border-2 border-yellow-700 flex flex-row'>
        <div>

          <Sidebar />
        </div>



        <div className='bg-red-100 w-[90%] justify-center'>
          <h1> Create Product </h1>
        </div>


      </div>
    </LayOut>
  )
}

export default AdminCreateProduct
