import React from 'react'

function SearchBar({ placeholder, onChange }) {
  return (
    <div className="md:flex items-center  mt-3 max-w-md mx-auto p-2 bg-yellow-400 rounded-full shadow-md">
    <input
      type="text"
      placeholder={placeholder || 'Search...'}
      className="flex-1 py-2 px-4 rounded-full focus:outline-none mb-2 md:mb-0 md:mr-2"
      onChange={onChange}
    />
    <button className="p-2 bg-red-500 text-white rounded-full">
      Search
    </button>
  </div>
  );
  
}

export default SearchBar