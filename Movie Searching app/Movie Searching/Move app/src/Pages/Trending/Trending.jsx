import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MoveCard from '../../Components/Movie Card/MoveCard'
import Navbar from '../../Components/NavBar/NavBar'
import Pages from '../../Components/Pagination/Pages'
// import Pages from '../../Components/Pagination/Pages'

function Trending() {

  const [trendContent, setTrendContent] = useState([])

  const [page, setPage] = useState(() => {
    // Get the current page from localStorage or default to 1
    const storedPage = localStorage.getItem('currentPages');
    return storedPage ? parseInt(storedPage, 10) : 1;
  })
  const fetchTrending = async () => {

    try {

      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=4e44d9029b1270a757cddc766a1bcb63&page=${page}`
      )

      setTrendContent(data.results);
      console.log(data)
      // Save the current page to localStorage
      localStorage.setItem('currentPages', page.toString());
    } catch (error) {
      console.error('Error fetching movie data:', error);

    }
  }
  useEffect(() => {
    fetchTrending();
  }, [page])



  const SelectedPageHandler = (SelectedPage) => {
    setPage(SelectedPage)
  }
  return (
    <>
      <div className='flex flex-wrap'>
        {
          trendContent && trendContent.map((movieData) => (
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
        <div className='flex bg-black p-5 w-full justify-center items-center' >

          <Pages movie_content={trendContent} NumberofPage={page} Selected_Page_Handler={SelectedPageHandler} />
        </div>
      </div>
    </>


  )
}

export default Trending
