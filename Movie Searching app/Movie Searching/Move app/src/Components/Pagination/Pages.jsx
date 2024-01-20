import React from 'react';

function Pages({ movie_content, NumberofPage, Selected_Page_Handler }) {
    return (
        <>
            <div className='text-2xl bg-red-100 m-5 px-3 py-1 rounded w-30 h-10'>
                <span className='cursor-pointer' onClick={() => Selected_Page_Handler(NumberofPage + 1)}>⬅️</span>
           
                {Array.from({ length: Math.ceil(movie_content.length / 2) }, (_, i) => (
                    <span
                        className={`bg-black-500 p-1 cursor-pointer hover:bg-yellow-500 ${NumberofPage === i + 1 ? 'bg-yellow-500' : 'bg-white'
                            }`}
                        key={i}
                        onClick={() => Selected_Page_Handler(i + 1)}
                    >
                        {i + 1}
                    </span>
                ))}
                <span className='bg-white cursor-pointer' onClick={() => Selected_Page_Handler(NumberofPage + 1)}>➡️</span>
            </div>
        </>
    );
}

export default Pages;
