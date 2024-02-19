// src/components/Sidebar.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mycontext from '../../Context/myContext';
// import mycontext from '../../Context/myContext';

const UserSideBar = () => {
    // const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState('');

    const ContextData = useContext(mycontext)
    const { auth, setAuth } = ContextData;
    useEffect(() => {
        setCurrentTab(window.location.pathname);
    }, []);


    return (
        <>



            <div className="bg-gradient-to-r bg-black from-fff878 to-ee49fd text-black w-52 h-screen   border-2 border-red-600">
                <div className="p-4">
                    <h1 className="text-2xl text-white font-bold">Sidebar</h1>
                </div>
                <nav>
                    <ul className="space-y-4 mt-4">

                        {/* Create Category Link  */}
                        <Link to={'/dashboard/user/order'}  >
                            <li className={`flex space-x-2 transition-all items-center   ${currentTab === '/dashboard/user/order' && 'md:bg-red-500'}  h-16    hover:bg-teal-500 w-52 p-2  `}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </span>
                                <span className=' font-semibold text-white text-xl'>
                                   
                                   Order
                                   </span>
                            </li>
                        </Link>



                        {/* Add Product Link  */}
                        <Link to={'/dashboard/user/profile'}>
                            <li className={`flex space-x-2 transition-all items-center   ${currentTab === '/dashboard/user/profile' && 'md:bg-teal-500'}  h-16    hover:bg-teal-500 w-52 p-2  `}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <span className=' font-semibold text-white text-xl'>User</span>
                            </li>
                        </Link>

                    </ul>
                </nav>
            </div>


            {/* ..........................content........ */}




        </>
    );
};

export default UserSideBar;