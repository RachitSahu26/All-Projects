import React, { useContext } from 'react';
import MoveCard from '../Movie Card/MoveCard';
import mycontext from '../../Context/Data/MyContext';

function CardArea() {
    const contextData = useContext(mycontext);
    const { allMovieData } = contextData;

    return (
        <div className='mt-2 flex flex-wrap'>
            {allMovieData.map((item, index) => (
                // Use parentheses here instead of curly braces
                <MoveCard
                    key={index}  // Add a unique key for each item in the map
                    title={item.Title}
                    poster={item.Poster}
                    year={item.Year}
                />
            ))}
        </div>
    );
}

export default CardArea;
