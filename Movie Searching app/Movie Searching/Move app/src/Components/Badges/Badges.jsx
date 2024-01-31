import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Badges({ type, onGenreClick }) {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const fetchGenres = async () => {
    try {
      const storedGenres = localStorage.getItem('movieGenres');
    
      if (storedGenres) {
        setGenres(JSON.parse(storedGenres));
      } else {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        );
        setGenres(data.genres);
      }
      
      // Check if there's a selected genre in local storage
      const storedSelectedGenre = localStorage.getItem('selectedGenre');
      if (storedSelectedGenre) {
        setSelectedGenre(JSON.parse(storedSelectedGenre));
      }
  
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleGenreClick = (genre) => {
    // Toggle selection on click
    const newSelectedGenre = selectedGenre === genre.id ? null : genre.id;
    setSelectedGenre(newSelectedGenre);

    // Save selected genre to local storage
    localStorage.setItem('selectedGenre', JSON.stringify(newSelectedGenre));

    onGenreClick(genre.id);
  };
  return (
    <>
      {genres.map((genre) => (
        <span
          key={genre.id}
          className={`cursor-pointer text-black text-2xl font-medium hover:bg-blue-400 mr-2 px-2.5 py-0.5 rounded transition duration-300 ${
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
