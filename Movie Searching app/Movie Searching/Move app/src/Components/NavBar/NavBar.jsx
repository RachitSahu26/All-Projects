// Navbar.jsx

import React, { useState } from 'react';
import Search from '../Search/Search';
// import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl"> <a href='/'>Movie Search</a></div>

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
          className={`lg:flex lg:items-center ${isOpen ? 'block' : 'hidden'
            }`}
        >
          <div className="lg:flex lg:mr-4">
            <a
              href="/trending"
              className="block lg:inline-block mt-4 lg:mt-0 text-white hover:text-gray-300 mr-4"
            >
              Trending
            </a>
            <a
              href="/movies"
              className="block lg:inline-block mt-4 lg:mt-0 text-white hover:text-gray-300 mr-4"
            >
              Movies
            </a>
            <a
              href="/tv_show"
              className="block lg:inline-block mt-4 lg:mt-0 text-white hover:text-gray-300"
            >
              TV Show
            </a>

            <a
              href="/search_Movie"
              className="block lg:inline-block mt-4 ml-3 lg:mt-0 text-white hover:text-gray-300"
            >
              Search
            </a>


          </div>
          <div >
          

            {/* Add additional links or components here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
