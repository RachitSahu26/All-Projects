// App.js
import React from 'react';
import NavBar from './Components/NavBar/NavBar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate, // Import Navigate component
  useLocation, // Import useLocation hook
  
} from 'react-router-dom';
import MyState from './Context/Data/MyState.jsx';

import MovieDetail from './Pages/MovieDetail/MovieDetail';
import Trending from './Pages/Trending/Trending.jsx';
import Movies from './Pages/Movies/Movies.jsx';
import TvShow from './Pages/TV show/TvShow.jsx';
import SearchMovie from './Pages/Search Movie/SearchMovie.jsx';
import Favorite from './Pages/FavotireMovie/Favorite.jsx';

// Define a new component that will handle the redirect
const RedirectToHome = () => {
  const location = useLocation();
  
  // Redirect to the home page when an unknown route is accessed
  return <Navigate to="/" state={{ from: location.pathname }} />;
};

function App() {
  return (
    <MyState>
      <Router>
        <>
          <NavBar />
          <Routes>
            <Route path="/trending" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv_show" element={<TvShow />} />
            <Route path="/search_Movie" element={<SearchMovie />} />
            <Route path="/favorite_Movie" element={<Favorite/>} />

            <Route path="/movieDetail/:id" element={<MovieDetail />} />
            <Route path="/*" element={<RedirectToHome />} /> {/* Catch-all route */}
          </Routes>
        </>
      </Router>
    </MyState>
  );
}

export default App;
