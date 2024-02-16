import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import mycontext from '../../Context/myContext';
import { toast } from 'react-toastify';

function Header() {

  const ContextData = useContext(mycontext);
  const { auth, setAuth } = ContextData;
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };


  const logOutHandle = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  }

  return (
    <>
      <nav className="bg-gray-800  ">



        <div className="max-w-7xl   mx-auto px-4">



          <div className=" h-16">
            <div className="flex justify-between">

              <div className="flex-shrink-0 flex items-center">
                <span className="text-teal-100 text-xl font-bold">Logo</span>
              </div>


              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/" className="text-gray-300 hover:text-white  p-4 rounded-md text-xl font-medium">Home</Link>
                  <Link to="/category" className="text-gray-300 hover:text-white p-4 rounded-md text-xl font-medium">Category</Link>




                  {
                    !auth.user ? (
                      <>
                        <Link to="/signup" className="text-gray-300 hover:text-white p-4 rounded-md text-xl font-medium">SignUp</Link>
                        <Link to="/signin" className="text-gray-300 hover:text-white p-4 rounded-md text-xl font-medium">SignIn</Link>

                      </>
                    ) : (

                      <>
                        <Link className="text-gray-300 hover:text-white p-4 rounded-md text-xl font-medium" onClick={logOutHandle}>Logout</Link>
                      </>
                    )
                  }




                </div>
              </div>


            </div>



            <div className="-mr-2 flex md:hidden">
              <button onClick={toggleNavbar} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:text-white">
                <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
            <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</a>
            <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
