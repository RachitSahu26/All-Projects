import React, { useContext } from 'react'
import   MyContext from '../../Context/Data/MyContext';

function SearchBar({ placeholder}) {

 const contexdata= useContext( MyContext);
const {movieSearch, setMovieSearch,fetchData }=contexdata
  return (
    <div className="md:flex items-center  mt-1  max-w-md mx-auto p-2 bg-yellow-400 rounded-full shadow-md">
   
   

    <input
      type="text"
      placeholder={placeholder || 'Search...'}
      value={movieSearch}
      className="flex-1 py-2 px-4 rounded-full focus:outline-none mb-2 md:mb-0 md:mr-2"
      onChange={(e)=>setMovieSearch(e.target.value)}
    />
    <button className="p-2 bg-red-500 text-white rounded-full"
    onClick={fetchData}
    >
      Search
    </button>
  
  
   
  </div>
  );
  
}

export default SearchBar