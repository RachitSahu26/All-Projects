import React from 'react'

function MoveCard() {
  return (
    <div className="p-2 md:w-1/4 w-full">
    <div className="bg-[#f84b4b65] p-3 rounded-2xl shadow-lg hover:-translate-y-1 border-2 border-gray-600">
      <img className='rounded-lg w-full mb-2' src="https://dummyimage.com/720x400" alt="" />
      <h2 className='text-xl text-white font-bold'>This is title</h2>
      <h2 className='text-lg text-white mb-2'>desc</h2>
    </div>
  </div>
    
  )
}

export default MoveCard