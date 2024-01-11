// MoveCard.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';


function MoveCard({ title, year, poster, id }) {







  return (
    <div className="p-2 md:w-1/4 w-full">
      <div className="bg-[#603030a4] p-3 border-white-100 rounded-2xl shadow-lg hover:-translate-y-1 border-2 border-gray-600">
        <Link to={`/movieDetail/${id}`}>
          <img className='rounded-lg w-full mb-2' src={poster} alt="" />
        </Link>
        <h2 className='text-xl text-white font-bold'>{title}</h2>
        <h2 className='text-lg text-white mb-2'>{year}</h2>
        <div className="flex justify-end">
          {/* Heart icon with dynamic color based on state */}
          <FaHeart
         
          />
        </div>
      </div>
    </div>
  );
}

export default MoveCard;
