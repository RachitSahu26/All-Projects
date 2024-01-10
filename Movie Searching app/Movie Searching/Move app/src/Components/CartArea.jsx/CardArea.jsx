import React, { useContext } from 'react';
import MoveCard from '../Movie Card/MoveCard';
import  MyContext from '../../Context/Data/MyContext';
import Loader from '../Loader/Loader';

function CardArea() {
    const contextData = useContext( MyContext);
    const { allMovieData,loading, setLoading } = contextData;

if(loading){
    return <Loader/>;
}



    return (
        <div className='mt-2 flex flex-wrap' >
            {
                allMovieData && allMovieData.length > 0 ?
                    allMovieData.map((item, index) => (
                        // Use parentheses here instead of curly braces
                        <MoveCard
                            key={index}  // Add a unique key for each item in the map
                            title={item.Title}
                            poster={item.Poster}
                            year={item.Year}
                            id={item.imdbID}
                        />
                    ))
        :<div   className='text-white   '>  no data found....  </div>
       
        }



        </div>
    );
}

export default CardArea;
