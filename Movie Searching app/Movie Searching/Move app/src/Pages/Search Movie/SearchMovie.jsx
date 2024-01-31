import React, { useState, useEffect } from 'react';
import Search from '../../Components/Search/Search';
import MoveCard from '../../Components/Movie Card/MoveCard';

function SearchMovie() {
  const [searchMovie, setSearchMovie] = useState('');
  const [searchMovieData, setSearchMovieData] = useState([]);

  // Function to fetch movie data based on the search query
  const fetchMovieData = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${searchMovie}`);
      const data = await res.json();
      console.log(data);
      setSearchMovieData(data.results); // Assuming the movie data is in the 'results' property

      // Save searchMovieData to local storage
      localStorage.setItem('searchMovieData', JSON.stringify(data.results));
    } catch (error) {
      console.error('Error fetching movie data:', error.message);
    }
  };

  useEffect(() => {
    // Load searchMovieData from local storage when component mounts
    const storedData = localStorage.getItem('searchMovieData');
    if (storedData) {
      setSearchMovieData(JSON.parse(storedData));
    }
  }, []);

  return (
    <>
      <div>
        {/* Search component with props */}
        <Search fetchMovieData={fetchMovieData} setSearchMovie={setSearchMovie} setSearchMovieData={setSearchMovieData} searchMovie={searchMovie} searchMovieData={searchMovieData} />
      </div>

      <div className='flex flex-wrap bg-black'>
        {/* Render movie cards based on searchMovieData */}
        {searchMovieData &&
          searchMovieData.map((movieData) => (
            <MoveCard
              key={movieData.id}
              id={movieData.id}
              poster={movieData.poster_path}
              title={movieData.title || movieData.name}
              date={movieData.first_air_date || movieData.release_date}
              media_type={movieData.media_type}
              vote_average={movieData.vote_average}
            />
          ))}
      </div>
    </>
  );
}

export default SearchMovie;
