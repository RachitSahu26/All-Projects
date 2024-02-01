import React, { useState } from 'react'


function Search({fetchMovieData,setSearchMovie, setSearchMovieData,searchMovie, searchMovieData}) {
  


    return (
        <div>
            <div className="input flex bg-black justify-center  px-5 lg:px-0 py-5">
                <input
                    type="text"
                    placeholder='Search any movies....'
                    value={searchMovie}
                    onChange={(e) => setSearchMovie(e.target.value)}
                    className=' shadow-md bg-black placeholder-gray-400 rounded-l-lg 
          px-2 py-2 w-80 outline-none border-2 border-white text-white '
                />
                <button
                    onClick={fetchMovieData}
                    className='bg-red-500 hover:bg-red-600 px-5   rounded-r-lg text-white shadow-md 
          border-b-2 border-r-2 border-t-2 border-black '>
                    Search
                </button>
            </div>
        </div>

    )
}

export default Search
