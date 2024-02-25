import React, { useContext } from 'react';
import mycontext from '../../Context/myContext';
import { Link } from 'react-router-dom';

function ProductCard() {
    const contextData = useContext(mycontext);
    const { allProduct } = contextData;

    return (
        <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allProduct.map((item) => (


<Link to={`/dashboard/admin/product/${item.slug}`} key={item._id}>
<div className="bg-white rounded-lg shadow-md">
    <div className="card-body p-4">
        <h5 className="text-xl font-bold mb-2">{item.name}</h5>
        <p className="text-gray-600 mb-4">Price: ${item.price}</p>
        <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>
        <p className="text-gray-600 mb-4">Category: {item.category}</p>
        <p className="text-gray-600 mb-4">Description: {item.description}</p>

        <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
        />
    </div>
    <div className="flex justify-end p-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Add to cart
        </button>
    </div>
</div>
</Link>

            ))}
        </div>
    );
}

export default ProductCard;
