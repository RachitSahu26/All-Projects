import React, { useEffect, useState } from 'react'
import MoveCard from '../../Components/Movie Card/MoveCard';
import axios from 'axios';

function Movies() {

    const [movieContent, setMovieContent] = useState([])


    const fetchMovie = async () => {
    
  
  
      const { data } = await axios.get(
        
       " https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&   "
    
    
       )

    }


    useEffect(() => {
      fetchMovie();
    }, [])
  



  return (
    <div className='flex flex-wrap'>
    {
      movieContent && movieContent.map((movieData) => (
        <MoveCard
        key={movieData.id}
        id={movieData.id}
        poster={movieData.poster_path}
        title={movieData.title || movieData.name}
        date={movieData.first_air_date || movieData.release_date}
        media_type={movieData.media_type}
        vote_average={movieData.vote_average}


        />

      ))



    }
  </div>
  )
}

export default Movies
