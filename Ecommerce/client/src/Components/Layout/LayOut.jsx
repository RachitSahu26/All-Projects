import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
const LayOut = (props) => {
  return (
    <div>
      <Header/>

      <main>
{props.children}
<ToastContainer/>

      </main>
   <Footer/>
    </div>
  )
}

export default LayOut
