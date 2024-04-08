import React from 'react';
import LayOut from '../Layout/LayOut';

const Spinner = () => {
    return (


        <div role="status" lassName="flex justify-center items-center h-screen">

    
         <div class="animate-spin inline-block size-16 border-[3px] border-current border-t-transparent text-teal-600 rounded-full" role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
            </div>
        </div>


    )
};

export default Spinner;