import { useState } from 'react'

import './App.css'
// import LayOut from './Components/Layout/LayOut'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Category from './Pages/Category'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
// import { ToastContainer } from 'react-toastify'
// import { Toaster } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'
// import Mystate from './Context/mystate.jsx';
import Dashboard from './Pages/DashBoard/UserDashboard.jsx'
import { Private } from './Components/PrivateRoute/Private.jsx'
import Mystate from './Context/mystate.jsx'
import AdminDashboard from './Pages/Admin/AdminDashboard.jsx'
import { AdminPrivate } from './Components/PrivateRoute/AdminPrivate.jsx'
import AdminCreateCategory from './Pages/Admin/AdminCreateCategory.jsx'
import AdminCreateProduct from './Pages/Admin/AdminCreateProduct.jsx'
import UserDashboard from './Pages/DashBoard/UserDashboard.jsx'
import UserOrder from './Pages/DashBoard/UserOrder.jsx'
import UserProfile from './Pages/DashBoard/UserProfile.jsx'

function App() {


  return (
    <>
      <Mystate>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />

          <Route path="/dashboard" element={<Private />} >
          
          
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/order" element={<UserOrder />} />
            <Route path="user/profile" element={<UserProfile />} />



          </Route>



          <Route path="/dashboard" element={<AdminPrivate />} >
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<AdminCreateCategory />} />
            <Route path="admin/create-product" element={<AdminCreateProduct />} />
            {/* <Route path="admin/create-product" element={<AdminCra />} /> */}

          </Route>


          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </Mystate>
      <ToastContainer />

    </>
  )
}

export default App