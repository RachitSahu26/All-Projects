// App.js
import React from 'react';
import NavBar from './Components/NavBar/NavBar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import MyState from './Context/Data/MyState.jsx';

import MovieDetail from './Pages/MovieDetail/MovieDetail';

import Trending from './Pages/Trending/Trending.jsx';
import Movies from './Pages/Movies/Movies.jsx';
import TvShow from './Pages/TV show/TvShow.jsx';

function App() {
  return (
    <MyState>
      <>
        <NavBar />
        <Router>
          <Routes>
        
            <Route path="/trending" element={<Trending/>} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/tv_show" element={<TvShow/>} />

            <Route path="/movieDetail/:id" element={<MovieDetail />} />
            
          </Routes>
        </Router>
      </>
    </MyState>
  );
}

export default App;
