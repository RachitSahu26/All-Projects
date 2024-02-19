import React from 'react'
import LayOut from '../../Components/Layout/LayOut.jsx'
import UserSideBar from '../../Components/SideBar/UserSideBar.jsx'

function UserOrder() {
  return (
    <LayOut>
    <div className='border-2 border-yellow-700 flex flex-row'>
      <div>

        <UserSideBar />
      </div>



      <div className='bg-red-100 w-[90%] justify-center'>




        <h1> User Order</h1>

      </div>


    </div>
  </LayOut>
  )
}

export default UserOrder