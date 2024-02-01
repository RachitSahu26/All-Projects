import React from 'react';

function MovieCard({ id, language, img, title }) {
  return (
    <div className="p-2 md:w-1/5 w-full">
    <div className="bg-[#000000a4] p-3 border-white-500 rounded-xl shadow-lg hover:-translate-y-1 border-2 border-white-600">
      <Link to={`/movieDetail/${id}`}>
        <img className='rounded-lg w-full mb-2' src={baseImageUrl + poster} alt="" />
      </Link>
      <h2 className='text-xl text-white font-bold'>{title}</h2>
      <h2 className='text-lg text-white mb-2'>{date}</h2>
    
      <div className="flex justify-end">
        {/* Heart icon with dynamic color based on state */}
        {/* <FaHeart /> */}
      </div>
    </div>
  </div>
 
  );
}

export default MovieCard;
