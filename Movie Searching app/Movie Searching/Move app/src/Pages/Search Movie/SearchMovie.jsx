import React, { useState, useEffect } from 'react';
import Search from '../../Components/Search/Search';
import MoveCard from '../../Components/Movie Card/MoveCard';
import Loader from '../../Components/Loader/Loader';

function SearchMovie() {
  const [searchMovie, setSearchMovie] = useState('');
  const [searchMovieData, setSearchMovieData] = useState([]);
const [loading,setLoading]=useState(true);
  // Function to fetch movie data based on the search query
  const fetchMovieData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${searchMovie}`);
      const data = await res.json();
      setLoading(false);

      console.log(data);
      setSearchMovieData(data.results); // Assuming the movie data is in the 'results' property

      // Save searchMovieData to local storage
      localStorage.setItem('searchMovieData', JSON.stringify(data.results));
    } catch (error) {
      setLoading(true)
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
      <div className=' pt-[3rem] pb-[3rem] bg-black'>
        {/* Search component with props */}
        <Search fetchMovieData={fetchMovieData} setSearchMovie={setSearchMovie} setSearchMovieData={setSearchMovieData} searchMovie={searchMovie} searchMovieData={searchMovieData} />
      </div>

     
     {
      loading?(

<Loader/>

      ):(



        <div className='flex flex-wrap bg-black pl-8 pr-8'>
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
      )
     }
     
     
    </>
  );
}

export default SearchMovie;
