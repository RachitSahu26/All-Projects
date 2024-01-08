import React from 'react'

function MoveCard({ title, year, poster }) {
  return (
    <div className="p-2 md:w-1/4 w-full">
    <div className="bg-[#f84b4b65] p-3 rounded-2xl shadow-lg hover:-translate-y-1 border-2 border-gray-600">
      <img className='rounded-lg w-full mb-2' src={poster} alt="" />
      <h2 className='text-xl text-white font-bold'>{title}</h2>
      <h2 className='text-lg text-white mb-2'>{year}</h2>
    </div>
  </div>
    
  )
}

export default MoveCard