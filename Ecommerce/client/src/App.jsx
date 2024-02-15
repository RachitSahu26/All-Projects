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
import Mystate from './Context/mystate.jsx';

function App() {


  return (
    <>
    <Mystate >

  <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/category" element={<Category/>}/>
<Route path="/signin" element={<SignIn/>}/>
<Route path="/signup" element={<SignUp/>}/>

  </Routes>
</Mystate>
<ToastContainer/>

    </>
  )
}

export default App
