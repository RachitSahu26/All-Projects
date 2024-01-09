import React, { useState } from 'react';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-black static top-0  p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold  text-xl">Movie Search</div>

                <button
                    className="lg:hidden text-white focus:outline-none"
                    onClick={toggleNavbar}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>

                <div
                    className={`lg:flex flex-grow items-center ${isOpen ? 'block' : 'hidden'
                        }`}
                >
                    <div className="lg:flex lg:mr-4   ">
                        <a
                            href="#"
                            className="block lg:inline-block mt-4 lg:mt-0 text-white hover:text-gray-300 mr-4"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="block lg:inline-block mt-4 lg:mt-0 text-white hover:text-gray-300 mr-4"
                        >
                            Movies
                        </a>
                        <a
                            href="#"
                            className="block lg:inline-block mt-4 lg:mt-0 text-white hover:text-gray-300"
                        >
                            About
                        </a>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default NavBar;
