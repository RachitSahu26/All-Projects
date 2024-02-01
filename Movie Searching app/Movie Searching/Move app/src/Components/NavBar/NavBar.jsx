import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { path: '/trending', label: 'Trending' },
    { path: '/movies', label: 'Movies' },
    { path: '/tv_show', label: 'TV Show' },
    { path: '/search_Movie', label: 'Search' },
    { path: '/favorite_Movie', label: 'Favorite' },
  ];

  return (
    <div>

      <nav className="bg-gray-800">
        {/* ... your existing Navbar code ... */}
      </nav>

      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">


          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${pathname === link.path ? 'bg-blue-500 rounded  ' : ''
                }`}
            >
              <span
                className={`text-sm ${pathname === link.path ? 'text-black ' : 'text-white'}  group-hover:text-blue-600 dark:group-hover:text-blue-500`}
              >
                {link.label}
              </span>
            </a>
          ))}




        </div>
      </div>
    </div>
  );
};

export default Navbar;