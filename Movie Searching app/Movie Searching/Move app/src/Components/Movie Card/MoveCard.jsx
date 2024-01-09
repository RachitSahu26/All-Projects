// MoveCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function MoveCard({ title, year, poster, id }) {
  return (

      <div className="p-2 md:w-1/4 w-full">
            <Link to={`/movieDetail/${id}`}>
        <div className="bg-[#000000a4] p-3 border-white-100 rounded-2xl shadow-lg hover:-translate-y-1 border-2 border-gray-600">
          <img className='rounded-lg w-full mb-2' src={poster} alt="" />
          <h2 className='text-xl text-white font-bold'>{title}</h2>
          <h2 className='text-lg text-white mb-2'>{year}</h2>
        </div>
        </Link>
      </div>

  );
}

export default MoveCard;
