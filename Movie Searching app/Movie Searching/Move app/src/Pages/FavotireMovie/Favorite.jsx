// // Favorite.js
// import React, { useContext } from 'react';
// import MyContext from '../../Context/Data/MyContext';
// import MoveCard from '../../Components/Movie Card/MoveCard';

// function Favorite() {
//   const favoriteMovieContext = useContext(MyContext);
//   const { favoriteMovies } = favoriteMovieContext;

//   return (
//     <div>
//       <h1>Favorite Movies</h1>
//       {favoriteMovies.length === 0 ? (
//         <p>No favorite movies yet. Add some to your favorites!</p>
//       ) : (
//         <div className="flex flex-wrap">
//           {favoriteMovies.map((movie) => (
//             <MoveCard
//               key={movie.id}
//               id={movie.id}
//               poster={movie.poster} // Update with the correct property name
//               title={movie.title}
//               date={movie.date}
//               media_type={movie.media_type}
//               vote_average={movie.vote_average}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Favorite;
