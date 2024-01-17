import React from 'react'

function Product() {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-md overflow-hidden sm:max-w-md lg:max-w-lg">
    <div className="sm:flex sm:items-center px-6 py-4">
      <img
        src="https://m.media-amazon.com/images/I/811R8Gdxd0L._SY879_.jpg" Replace with the actual image source
        alt="dfd"
        className="block mx-auto flex-shrink-0 h-16 w-16 sm:h-24 sm:w-24 rounded-full"
      />
      <div className="mt-4 sm:mt-0 sm:ml-4">
        <h3 className="text-xl font-medium text-gray-900">product.name</h3>
        <p className="text-sm text-gray-500">$product.price</p>
        <p className="mt-1 text-sm text-gray-500">product.description</p>
      </div>
    </div>
    <div className="border-t border-gray-200 px-6 py-4">
      <button
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add to Cart
      </button>
    </div>
  </div>
  )
}

export default Product
