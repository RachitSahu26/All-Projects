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
        <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {combinedProducts.map((item) => (
                <div className="bg-white rounded-lg shadow-md">
                    <Link to={`/dashboard/admin/product/${item.slug}`} key={item._id}>
                        <div className="card-body p-4">
                            <h5 className="text-xl font-bold mb-2">{item.name}</h5>
                            <p className="text-gray-600 mb-4">Price: ${item.price}</p>
                            <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>
                            {/* Render category name instead of category ID */}
                            <p className="text-gray-600 mb-4">Category: {categories.find(cat => cat._id === item.category)?.name}</p>
                            <p className="text-gray-600 mb-4">Description: {item.description}</p>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                    </Link>
                    <div className="flex justify-end p-4">
                        <button onClick={() => addCartItem(item)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                            Add to cart
                        </button>

                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductCard;
