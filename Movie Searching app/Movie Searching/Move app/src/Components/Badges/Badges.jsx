import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Badges({ type, onGenreClick }) {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      console.log(data.genres);
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleGenreClick = (genre) => {
    // Toggle selection on click
    setSelectedGenre((prevGenre) => (prevGenre === genre.id ? null : genre.id));
    onGenreClick(genre.id);
  };

  return (
    <>
      {genres.map((genre) => (
        <span
          key={genre.id}
          className={`cursor-pointer text-black text-2xl font-medium mr-2 px-2.5 py-0.5 rounded ${
            selectedGenre === genre.id ? 'bg-red-500' : 'bg-white'
          }`}
          onClick={() => handleGenreClick(genre)}
        >
          {genre.name}
        </span>
      ))}
    </>
  );
}

export default Badges;
