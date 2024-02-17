import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import mycontext from '../../Context/myContext';
import { toast } from 'react-toastify';

function Header() {
   const navigate =  useNavigate()
  const ContextData = useContext(mycontext);
  const { auth, setAuth } = ContextData;
  // const [isOpenNav, setIsOpenNav] = useState(false);

  // const toggleNavbars = () => {
  //   setIsOpenNav(!isOpenNav);
  // };


  const logOutHandle = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/signin");
  }


  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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


                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={toggleMenu}
                          >
                            Options
                            <svg
                              className={`${isOpen ? '-mr-1' : 'mr-1'} h-5 w-5 text-gray-400`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>

                          {isOpen && (
                            <ul className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <li>
                                <Link to={`/dashboard/${auth?.user?.role===1 ?"admin":"user"}`} className="text-gray-700 block px-4 py-2 text-sm">
                                  Dashboard
                                </Link>
                              </li>
                              <li>
                                <Link onClick={logOutHandle} className="text-gray-700 block px-4 py-2 text-sm">
                                  Logout
                                </Link>
                              </li>


                            </ul>
                          )}
                        </div>




                      </>
                    )
                  }



                  <Link className="text-gray-300 hover:text-white p-4 rounded-md text-xl font-medium" >Cart</Link>

                </div>
              </div>


            </div>

          </div>

        </div>

      </nav>
    </>
  )
}

export default Header
