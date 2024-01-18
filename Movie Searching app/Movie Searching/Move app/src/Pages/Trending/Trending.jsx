import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MoveCard from '../../Components/Movie Card/MoveCard'

function Trending() {

  const [trendContent, setTrendContent] = useState([])


  const fetchTrending = async () => {


    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=4e44d9029b1270a757cddc766a1bcb63`)

    setTrendContent(data.results);
    console.log(data)

  }
  useEffect(() => {
    fetchTrending();
  }, [])

  return (
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
    </div>
  )
}

export default Trending
