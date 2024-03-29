import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mycontext from '../../Context/myContext';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaBars, FaTimes, FaList, FaHome, FaUser, FaUserPlus, FaPlus, FaBox, FaSignOutAlt, FaHeart } from 'react-icons/fa';
// import { FaBars,  } from 'react-icons/fa';
function Header() {
  const navigate = useNavigate();
  const ContextData = useContext(mycontext);
    // ...............cart from redux........
  const cartItem = useSelector((state) => state.cart);
  const { auth, setAuth, categories, getAllCategory } = ContextData;

  // ...............wishlist from redux........
  const wishlistItems = useSelector(state => state.wishList.items);
 
console.log(wishlistItems)






  const [selectedCategorySlug, setSelectedCategorySlug] = useState('');


  // ...............toggle menu state........
  const [isRegisterMenuOpen, setIsRegisterMenuOpen] = useState(false);
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
    setIsRegisterMenuOpen(false);

  };



  const toggleRegistationMenu = () => {
    setIsRegisterMenuOpen(!isRegisterMenuOpen);
    setIsCategoryMenuOpen(false)
  };

  // Function to handle category selection
  const handleCategorySelection = (slug) => {
    setSelectedCategorySlug(slug);

  };





  return (
    <>
      {/* <nav className="bg-gray-800  max-w-2xl sm:max-w-7xl"> */}

      <nav className="bg-white p-1 max-w-2xl sm:max-w-7xl lg:max-w-full sticky top-0 z-10 shadow-md">

        {/* .............large screen ......... */}
        <div className="h-16 flex justify-between items-center m-5">


          {/* mobile screen hamburger................. */}
          <div className="flex-shrink-0 md:hidden  flex items-center pl-5">
            {isMobileNavOpen ? (
              <FaTimes style={{ color: 'black' }} onClick={toggleMobileNav} />
            ) : (
              <FaBars style={{ color: 'black' }} onClick={toggleMobileNav} />
            )}
          </div>


          {/* ...........logo....... */}
          <div className='item-center'>
            <span className="text-black text-xl ml-5 font-bold"><Link to="/">VRS_Shopy</Link></span>
          </div>





          <div className=" flex justify-center  items-baseline space-x-4 md:space-x-8">



            {/* ........................Category................. */}

            <div className="relative items-center  ">
              <button
                onClick={toggleCategoryMenu}
                // Toggle menu off hover
                className="hidden  md:flex justify-center items-center  text-xl text-black font-bold hover:text-gray-400 py-3 focus:outline-none"
              >
                {/* <FaList className="inline-block text-black mr-2" /> */}
                Category
              </button>
              {/* Category menu content */}


              {isCategoryMenuOpen && (



                <div className="hidden md:block  text-white absolute top-full  border-2 border-teal-500 py-2 bg-black shadow-lg rounded-md">
                  <div className="flex flex-col">
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        to={`/category/${category.slug}`}
                        className={`px-4 py-2 ${selectedCategorySlug === category.slug ? 'text-yellow-500' : 'text-white'} hover:text-teal-500`}
                        onClick={() => handleCategorySelection(category.slug)}
                      >
                        {category.name}
                      </Link>
                    ))}


                  </div>

                </div>



              )}
            </div>





















            {/* .........................Cart .............. */}

            <div className='flex justify-center '>


              {
                auth?.token && (

                  <>

                    <Link to="/cart" className="flex items-center lg: text-gray-300 hover:text-white p-1 mt-5 rounded-md text-md font-medium duration-300 ease-in-out transform hover:scale-110">

                      <div className='p-2  relative right-2   '>
                        <span className="bg-red-500 rounded-full absolute top-0 right-0   text-xs px-2 py-1">
                          {cartItem.length}
                        </span>

                        <div className='flex justify-center items-center flex-col'>
                          <div>

                            <FaShoppingCart className="text-2xl text-black" />

                          </div>
                          <div >

                            <p className='text-black text-[15px]'>
                              Cart

                            </p>
                          </div>

                        </div>

                      </div>


                    </Link>

                    {/* ..................................wishlist .......................... */}


                    <Link to="/wishlist" className="flex items-center lg:text-gray-300 hover:text-white p-1 mt-5 rounded-md text-md font-medium duration-300 ease-in-out transform hover:scale-110">
                      <div className='p-2 relative right-2'>

                        <span className="bg-red-500 rounded-full absolute top-0 right-0 text-xs px-2 py-1">
                          {wishlistItems.length}
                        </span>

                        <div className='flex justify-center items-center flex-col'>
                          <div>

                            <FaHeart className="text-xl text-black" />
                          </div>
                          <div >

                            <p className='text-black text-[15px]'>
                              Wishlist

                            </p>
                          </div>

                        </div>


                      </div>
                    </Link>



                  </>


                )
              }






              {/* ....................user profile ......... */}
              {/* Render other navigation links */}




              <Link className=" text-xl text-black  inline-block transition duration-300 ease-in-out transform hover:scale-110">

                <div className='flex mt-5 justify-center items-center flex-col  p-2'>

                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full  bg-red-200 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-300 flex items-center justify-center">
                    <FaUser className="text-xl md:text-lg" onClick={toggleRegistationMenu} />
                  </div>



                </div>



              </Link>

            </div>












          </div>







        </div>


































        {/* Mobile navigation menu */}
        <div className='block md:hideen'>

          {isMobileNavOpen && (



            <div className="   pl-8   ">
              <Link to="/" className="block text-2xl  text-black font-bold hover:text-white py-3"><FaHome className="inline-block mr-2" />Home</Link>

              {/* 
              {
                auth.token ? (
                  <div>
                    <span onClick={logOutHandle} className='cursor-pointer block text-2xl text-black font-bold hover:text-white py-3'>
                      <FaSignOutAlt className="inline-block mr-2" /> Logout
                    </span>
                  </div>
                ) : (
                  <div>
                  

                  </div>
                )



              } */}





              {/* ......................dashboar............ */}
              {/* {
                auth?.user?.role === 1 ? (
                  <div>
                    <Link to="/dashboard/admin/create-category" className="block text-2xl text-black font-bold hover:text-white py-3">
                      <FaPlus className="inline-block mr-2" /> Create Category
                    </Link>
                    <Link to="/dashboard/admin/create-product" className="block text-2xl text-black font-bold hover:text-white py-3">
                      <FaBox className="inline-block mr-2" /> Create Product
                    </Link>
                    <Link to="/dashboard/admin/all-product" className="block text-2xl text-black font-bold hover:text-white py-3">
                      <FaList className="inline-block mr-2" /> All Products
                    </Link>
                  </div>
                ) : (
                  <Link to="/dashboard/user/order" className="block text-2xl text-black font-bold hover:text-white py-3">
                    <FaPlus className="inline-block mr-2" /> Order
                  </Link>
                )
              } */}




              <div className="relative">
                <button

                  onClick={toggleCategoryMenu}// Toggle menu off hover
                  className="block text-2xl text-black font-bold hover:text-gray-500 py-3 focus:outline-none"
                >
                  <FaList className="inline-block mr-2" />Category
                </button>
                {/* Category menu content */}
                {isCategoryMenuOpen && (
                  <div className="absolute w-40 top-full left-0 z-10 py-2 bg-black border-2 border-teal-500  shadow-lg rounded-md">
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        to={`/category/${category.slug}`}
                        className="block px-4 py-2 text-white m-2 rounded hover:bg-gray-500"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>





            </div>
          )}
        </div >

      </nav >




      {/* ..................toggle menu................ */}



      {/* .................user dashboard profile and other............. */}

      {
        isRegisterMenuOpen && (
          <div className="text-white z-10 w-50 absolute top-240 right-8  border-2 border-teal-500 p-5 rounded-lg bg-black">


            <div className="flex flex-col">

              {
                auth?.token && (
                  <>

                    <div className="p-3 hover:bg-gray-600 rounded">
                      <Link to="/dashboard/user/profile">

                        <span>Profile</span>
                      </Link>


                    </div>

                    <div className="p-3 hover:bg-gray-600 rounded">
                      <Link to="/dashboard/user/order">
                        <span>Order</span>
                      </Link>
                    </div>
                  </>
                )

              }





              {auth?.user?.role == 1 && (
                <>
                  {/* All Product */}
                  <div className="p-3 hover:bg-gray-600 rounded">

                    <Link to="/dashboard/admin/all-product">
                      <span>All Product</span>
                    </Link>
                  </div>

                  {/* Add Product */}
                  <div className="p-3 hover:bg-gray-600 rounded">

                    <Link to="/dashboard/admin/create-product">
                      <span>Add Product</span>
                    </Link>
                  </div>

                  {/* Create Category */}
                  <div className="p-3 hover:bg-gray-600 rounded">

                    <Link to="/dashboard/admin/create-category">
                      <span>Create Category</span>
                    </Link>
                  </div>
                </>
              )}






              {/* Conditionally render login, signup, or logout links based on the availability of auth token */}
              {auth.token ? (
                <div>
                  {/* Logout link */}
                  <div className="p-3 ">
                    {/* <span  className='cursor-pointer'> Logout</span> */}
                    <FaSignOutAlt onClick={logOutHandle} className="inline-block mr-2" /> Logout
                  </div>
                </div>
              ) : (
                <div>
                  {/* Login link */}
                  <div className="p-3">

                    <Link to="/signin" className="block  text-white font-bold hover:text-white py-3"><FaUser className="inline-block mr-2" />Log In</Link>


                  </div>

                  {/* Signup link */}
                  <div className="p-3">


                    <Link to="/signup" className="block  text-white font-bold hover:text-white py-3">
                      <FaUserPlus className="inline-block mr-2" />Sign Up</Link>




                  </div>
                </div>
              )}


            </div>



          </div>
        )
      }




    </>
  );
}

export default Header;
