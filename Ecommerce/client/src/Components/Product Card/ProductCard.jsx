import React, { useContext, useEffect } from 'react';
import mycontext from '../../Context/myContext';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../Redux/Slice/CartSlice';
import { toast } from 'react-toastify';

function ProductCard({ FilterProducts }) {
    const contextData = useContext(mycontext);
    const { allProduct, categories } = contextData;
    const navigate = useNavigate()
    // Combine allProduct and filterProducts into a single array
    const combinedProducts = FilterProducts.length > 0 ? FilterProducts : allProduct;


    const cartItem = useSelector((state) => state.cart);

    const dispatch = useDispatch()

    const addCartItem = (product) => {
        dispatch(addToCart(product));
        // toast.success("Cart Successfully added")
        console.log(cartItem);
    }




    return (





        <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {combinedProducts.map((item, index) => (
                <div key={index} className="max-w-sm bg-white border h-[95%] max-h-[auto] m-2 p-2 border-gray-200 rounded-lg shadow">

                    <Link to={`/product/${item.slug}`} >
                        <img className="rounded-lg" src={`http://localhost:3000/api/product/product-photo/${item._id}`} alt={item.name} />
                    </Link>
                    <div >
                        <a href="#">
                            <h3 className="text-lg  font-bold text-black">{item.name}</h3>
                        </a>
                        <p class="mt-1 text-xs text-gray-700">${item.description.slice(0, 30)}${item.description.length > 30 ? '...' : ''}</p>
                        <p className="mt-1 text-lg text-black line-clamp-3">${item.price}</p>

                        {/* <p className="mt-1 text-sm text-black line-clamp-3">{item.category}</p> */}
                        {/* <p className="mt-1 text-sm text-black line-clamp-3">{categories.find(cat => cat._id === item.category)?.name}</p> */}


                        <div className="flex justify-center mt-3 m-1">
                            <button onClick={() => addCartItem(item)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                                Add to cart
                            </button>

                        </div>

                    </div>
                </div>
            ))}
        </div>



        // <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        //     {combinedProducts.map((item) => (

        //         <Link to={`/dashboard/admin/product/${item.slug}`} key={item._id}>
        //             <div className="max-w-sm bg-white border  m-5 p-5  border-gray-200 rounded-lg shadow">
        //                 <a href="#">
        //                     <img className="rounded-lg" src={`http://localhost:3000/api/product/product-photo/${item._id}`} alt={item.name} />
        //                 </a>
        //                 <div className="p-5">
        //                     <a href="#">
        //                         <h3 className="text-lg font-bold text-black">{item.name}</h3>
        //                     </a>
        //                     <p className="mt-1 text-sm text-black line-clamp-3">{item.description}</p>
        //                     <a href="#" className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        //                         Read more
        //                         <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        //                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        //                         </svg>
        //                     </a>
        //                 </div>
        //             </div>
        //         </Link>

        //     ))}
        // </div >

    );
}

export default ProductCard;
