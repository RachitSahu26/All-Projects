import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Badges({ type }) {
  
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);


  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      console.log(data.genres); // Check if genres are nested under the 'genres' property
      setGenres(data.genres); // Set genres to the correct property
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>
      {genres.map((genre) => (
        <span
          key={genre.id}
          className={`bg-white cursor-pointer text-black text-2xl font-medium mr-2 px-2.5  py-0.5 rounded `}
        >
          {genre.name}
        </span>
      ))}
    </>
  );
}

export default Badges;
