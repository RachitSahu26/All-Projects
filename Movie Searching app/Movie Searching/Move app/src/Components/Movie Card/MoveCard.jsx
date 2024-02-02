// MoveCard.js
import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
// import { FaHeart } from 'react-icons/fa';
// import MyContext from '../../Context/Data/MyContext';

function MoveCard({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) {
  const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
  // const [isFavorite, setIsfavorite] = useState(false);
  // const favoriteMovieContext = useContext(MyContext);
  // const { addToFavorite, removeFromFavorites } = favoriteMovieContext;

  // Function to toggle the favorite status
  // const toggleFavorite = () => {

  //   setIsfavorite(!isFavorite)
  //   // addToFavorite({id,
  //   //   poster,
  //   //   title,
  //   //   date,
  //   //   media_type,
  //   //   vote_average,});


  // }

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
          {/* <FaHeart
            onClick={toggleFavorite}
            color={isFavorite ? 'red' : 'white'} // Change color based on favorite status
            cursor="pointer"
          /> */}
        </div>
        {/* <p>{isFavorite(id) ? 'Remove from Favorites' : 'Add to Favorites'}</p> */}
      </div>
    </div>
  );
}

export default MoveCard;
