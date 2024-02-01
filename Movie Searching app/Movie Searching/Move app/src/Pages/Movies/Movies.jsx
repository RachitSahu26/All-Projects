import MoveCard from '../../Components/Movie Card/MoveCard';
import axios from 'axios';
import Pages from '../../Components/Pagination/Pages';
import Badges from '../../Components/Badges/Badges';
import { useEffect, useState } from 'react';
import Loader from '../../Components/Loader/Loader';
import { FaHeart } from 'react-icons/fa';
// import FavoriteIcon from '../../Components/FavoriteIcon/FavoriteIcon';

function Movies() {
  const [movieContent, setMovieContent] = useState([]);
  const [noofPage, setNoofPage] = useState('');
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem('currentPage');
    return storedPage ? parseInt(storedPage, 10) : 1;
  });
  const [selectedGenre, setSelectedGenre] = useState(() => {
    const storedGenre = localStorage.getItem('selectedGenre');
    return storedGenre ? JSON.parse(storedGenre) : null;
  });
  const [loading, setLoading] = useState(true); // New loading state

  const fetchMovie = async () => {
    try {

      setLoading(true); // Set loading to true when fetching data

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&with_genres=${selectedGenre}&page=${page}`
      );

      setMovieContent(data.results);
      setNoofPage(data.total_pages);

      localStorage.setItem('currentPage', page.toString());


    }

    catch (error) {
      console.error('Error fetching movie data:', error);
    }


    finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }


  };

  useEffect(() => {
    fetchMovie();
  }, [selectedGenre, page]);

  const handleGenreClick = (genre) => {
    const newSelectedGenre = selectedGenre === genre ? null : genre;
    setSelectedGenre(newSelectedGenre);
    localStorage.setItem('selectedGenre', JSON.stringify(newSelectedGenre));
    setPage(1);
  };

  const SelectedPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  return (
    <>
      <div className='bg-gray-600 '>
        <h4 className='text-white text-4xl flex justify-center p-5'>MOVIES</h4>

      </div>

      <div className='flex bg-black flex-wrap gap-3  p-5 justify-center items-center'>
        <Badges type="movie" onGenreClick={handleGenreClick} selectedGenre={selectedGenre} />
      </div>

      {loading ?


        (
          // Render loading component when loading is true
          <Loader />

        )



        :



        (
          <div className='flex flex-wrap bg-black pl-8 pr-8 '>
            {movieContent &&
              movieContent.map((movieData) => (
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



            <div className='flex bg-black mb-28 p-5 w-full justify-center items-center'>
              <Pages movie_content={movieContent} NumberofPage={page} Selected_Page_Handler={SelectedPageHandler} />
            </div>


          </div>
        )}
    </>
  );
}

export default Movies;
