import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MoveCard from '../../Components/Movie Card/MoveCard';
import Pages from '../../Components/Pagination/Pages';
import Badges from '../../Components/Badges/Badges';
import Loader from '../../Components/Loader/Loader';

function TvShows() {
  const [tvShowContent, setTVShowContent] = useState([]);
  const [noofPage, setNoofPage] = useState('');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem('currentPage');
    return storedPage ? parseInt(storedPage, 10) : 1;
  });

  const fetchTVShows = async () => {



    try {



      setLoading(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=4e44d9029b1270a757cddc766a1bcb63&page=${page}`
      );

      setTVShowContent(data.results);
      setLoading(false);
      setNoofPage(data.total_pages);
      

      localStorage.setItem('currentPage', page.toString());
    } catch (error) {
      setLoading(true);
      console.error('Error fetching TV show data:', error);
    }     


     };

  useEffect(() => {
    fetchTVShows();
  }, [page]);

  const SelectedPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  return (
    <>
      <div className='bg-gray-600'>
        <h4 className='text-white text-4xl  flex justify-center p-5'>TV SHOW</h4>

      </div>

      {
        loading ? (
          <Loader />
        ) : (

          <div className='flex flex-wrap bg-black pl-8 pr-8'>
            {tvShowContent &&
              tvShowContent.map((showData) => (
                <MoveCard
                  key={showData.id}
                  id={showData.id}
                  poster={showData.poster_path}
                  title={showData.name}
                  date={showData.first_air_date}
                  media_type="tv"
                  vote_average={showData.vote_average}
                />
              ))}
            <div className='flex bg-black p-5 w-full just`ify-center items-center'>
              <Pages movie_content={tvShowContent} NumberofPage={page} Selected_Page_Handler={SelectedPageHandler} />
            </div>



          </div>
        )

      }

    </>
  );
}

export default TvShows;
