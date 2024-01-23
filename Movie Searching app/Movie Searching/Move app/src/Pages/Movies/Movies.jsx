import MoveCard from '../../Components/Movie Card/MoveCard';
import axios from 'axios';
import Pages from '../../Components/Pagination/Pages';
// import { Badge } from 'lucide-react';
import Badges from '../../Components/Badges/Badges';
import { useEffect, useState } from 'react';
function Movies() {
  const [movieContent, setMovieContent] = useState([]);
  const [noofPage, setNoofPage] = useState('');
  const [page, setPage] = useState(() => {
    // Get the current page from localStorage or default to 1
    const storedPage = localStorage.getItem('currentPage');
    return storedPage ? parseInt(storedPage, 10) : 1;
  });
  // const [currentPage, setCurrentPage] = useState();

  const fetchMovie = async () => {
    try {
    
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=4e44d9029b1270a757cddc766a1bcb63&page=${page}`
      );

      setMovieContent(data.results);
      setNoofPage(data.total_pages);
      // setCurrentPage(pageNumber);

      // Save the current page to localStorage
      localStorage.setItem('currentPage', page.toString());
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [page]);

  // const handlePageChange = (pageNumber) => {
  //   fetchMovie(pageNumber);
  // };



  const SelectedPageHandler = (SelectedPage) => {



      setPage(SelectedPage)
  }
  return (

    <>

      <div className='flex bg-black  flex-wrap gap-3 p-5  justify-center items-center'>
        <Badges type="movie"  />
      </div>

      <div className='flex flex-wrap bg-black'>



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

        <div className='flex bg-black p-5 w-full justify-center items-center'>
          <Pages movie_content={movieContent} NumberofPage={page} Selected_Page_Handler={SelectedPageHandler} />
        </div>





      </div>
    </>

  );
}

export default Movies;