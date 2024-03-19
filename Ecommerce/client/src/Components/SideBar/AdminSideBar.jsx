// src/components/Sidebar.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mycontext from '../../Context/myContext';
// import mycontext from '../../Context/myContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState('');

    const ContextData = useContext(mycontext)
    const { auth, setAuth } = ContextData;
    useEffect(() => {
        setCurrentTab(window.location.pathname);
    }, []);


    const logout = () => {
        localStorage.clear('token')

        navigate('/login')
    }


    return (
        <>



            <div className=" hidden md:block bg-gradient-to-r bg-black from-fff878 to-ee49fd text-black w-52 h-screen border-r-2 border-blue-">
                <div className="p-4">
                    <h1 className="text-2xl text-white font-bold">Sidebar</h1>
                </div>
                <nav>
                    <ul className="space-y-4 mt-4">


                        {/* Create Category Link  */}
                        <Link to={'/dashboard/admin/create-category'}  >
                            <li className={`flex space-x-2 transition-all items-center   ${currentTab === '/dashboard/admin/create-category' && 'md:bg-red-500'}  h-16    hover:bg-teal-500 w-52 p-2  `}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </span>
                                <span className=' font-semibold text-white text-xl'>

                                    Crate Category
                                </span>
                            </li>
                        </Link>



                        {/* Add Product Link  */}
                        <Link to={'/dashboard/admin/create-product'}>
                            <li className={`flex space-x-2 transition-all items-center   ${currentTab === '/dashboard/admin/create-product' && 'md:bg-teal-500'}  h-16    hover:bg-teal-500 w-52 p-2  `}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <span className=' font-semibold text-white text-xl'>Create Product</span>
                            </li>
                        </Link>



                        {/*  Product List */}
                        <Link to={'/dashboard/admin/all-product'}>
                            <li className={`flex space-x-2 transition-all items-center   ${currentTab === '/dashboard/admin/product' && 'md:bg-teal-500'}  h-16    hover:bg-teal-500 w-52 p-2  `}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <span className=' font-semibold text-white text-xl'>All Product</span>
                            </li>
                        </Link>




                        {/* 
                        Profile Page Link 
                        <Link to={'/dashboard/admin/profile'} activeClassName="border-b-indigo-600">
                            <li className={`flex space-x-2 transition-all items-center   ${currentTab === '/dashboard/admin/profile' && 'md:bg-teal-500'}  h-16    hover:bg-teal-500 w-52 p-2  `}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                <span className=' font-semibold text-white text-xl'>Profile</span>
                            </li>
                        </Link>
                        Logout  */}




                    </ul>
                </nav>
            </div>


            {/* ..........................content........ */}




        </>
    );
};

export default Sidebar;