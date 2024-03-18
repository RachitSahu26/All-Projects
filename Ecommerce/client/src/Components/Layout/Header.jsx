import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mycontext from '../../Context/myContext';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaBars, FaTimes, FaList, FaHome, FaUser, FaUserPlus } from 'react-icons/fa';
// import { FaBars,  } from 'react-icons/fa';
function Header() {
  const navigate = useNavigate();
  const ContextData = useContext(mycontext);
  const cartItem = useSelector((state) => state.cart);
  const { auth, setAuth, categories, getAllCategory } = ContextData;

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const logOutHandle = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem("auth");
    navigate('/signup');
    toast.success("Logout Successfully");
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };
  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen(!isCategoryMenuOpen);
  };

  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex justify-between items-center">
            <div className="flex-shrink-0 sm:hidden flex items-center pl-5">
              {isMobileNavOpen ? (
                <FaTimes style={{ color: 'white' }} onClick={toggleMobileNav} />
              ) : (
                <FaBars style={{ color: 'white' }} onClick={toggleMobileNav} />
              )}
            </div>
            <span className="text-teal-100 text-xl ml-5 font-bold"><Link to="/">VRS_Shopy</Link></span>

            <div className="ml-10 flex items-baseline space-x-4 md:space-x-8">
             


              {/* ........................Category................. */}

              <div className="relative border-2">
                <button
                  onMouseEnter={toggleCategoryMenu} // Toggle menu on hover
                  onMouseLeave={toggleCategoryMenu} // Toggle menu off hover
                  className="hidden md:block text-2xl text-gray-300 hover:text-white py-3 focus:outline-none"
                >
                  <FaList className="inline-block mr-2" />
                </button>
                {/* Category menu content */}
                {isCategoryMenuOpen && (
                  <div className="  hidden md:block absolute top-full left-0 z-10 py-2 bg-yellow-500 shadow-lg rounded-md">
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        to={`/category/${category.slug}`}
                        className=" px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>












              {/* Render other navigation links */}
              <Link to="/signin" className=" hidden md:block text-xl   text-gray-300 hover:text-white py-3"><FaUser className="inline-block mr-2" /></Link>

              <Link to="/signup" className="hidden md:block text-xl text-gray-300 hover:text-white py-3"><FaUserPlus className="inline-block mr-2" /></Link>




              <Link to="/cart" className="flex items-center text-gray-300 hover:text-white p-4 rounded-md text-xl font-medium">
                <FaShoppingCart className="mr-2" />
                Cart
                <span className="bg-red-500 rounded-full text-white px-2 py-1 ml-2">
                  {cartItem.length}
                </span>
              </Link>
            </div>
          </div>
        </div>










        {/* Mobile navigation menu */}
        {isMobileNavOpen && (
          <div className="  block md:hideen pl-8   ">
            <Link to="/" className="block text-2xl  text-gray-300 hover:text-white py-3"><FaHome className="inline-block mr-2" />Home</Link>
            <Link to="/signin" className="block text-2xl text-gray-300 hover:text-white py-3"><FaUser className="inline-block mr-2" />Log In</Link>
            <Link to="/signup" className="block text-2xl text-gray-300 hover:text-white py-3"><FaUserPlus className="inline-block mr-2" />Sign Up</Link>
           
           
           
           
            <div className="relative">
              <button
        
                onClick={toggleCategoryMenu}// Toggle menu off hover
                className="block text-2xl text-gray-300 hover:text-white py-3 focus:outline-none"
              >
                <FaList className="inline-block mr-2" />Category
              </button>
              {/* Category menu content */}
              {isCategoryMenuOpen && (
                <div className="absolute w-40 top-full left-0 z-10 py-2 bg-white  shadow-lg rounded-md">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      to={`/category/${category.slug}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Header;
