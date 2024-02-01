import React, { useState } from 'react';
import "../src/App.css"
// MovieCard component
const MovieCard = ({ id, title, language, img, onToggleFavorite, isFavorite }) => {
  return (
    <div>
      <img src={img} className='netflix-image' alt={title} />
      <h1>{title}</h1>
      <h1>{language}</h1>
      <button onClick={() => onToggleFavorite(id)}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

// App component
const App = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Function to toggle a movie as favorite
  const toggleFavorite = (movieId) => {
    const isFavorite = favoriteMovies.includes(movieId);

    if (isFavorite) {
      // Remove from favorites
      setFavoriteMovies(favoriteMovies.filter((id) => id !== movieId));
    } else {
      // Add to favorites
      setFavoriteMovies([...favoriteMovies, movieId]);
    }
  };

  // Dummy movie data
  const movieData = {
    id: 1,
    title: 'Movie Title',
    language: 'English',
    img: 'https://themarketingbirds.com/wp-content/uploads/2021/04/Lemony-Snickets-Series-of-Unfortunate-Events.jpg',
  };

  return (
    <div>
      <MovieCard
        id={movieData.id}
        title={movieData.title}
        language={movieData.language}
        img={movieData.img}
        onToggleFavorite={toggleFavorite}
        isFavorite={favoriteMovies.includes(movieData.id)}
      />
      <p>Favorites: {favoriteMovies.join(', ')}</p>
    </div>
  );
};

export default App;
