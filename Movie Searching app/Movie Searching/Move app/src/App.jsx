// App.js
import React from 'react';
import NavBar from './Components/NavBar/NavBar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import MyState from './Context/Data/MyState.jsx';
import Home from './Pages/Home/Home';
import MovieDetail from './Pages/MovieDetail/MovieDetail';

function App() {
  return (
    <MyState>
      <>
        <NavBar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movieDetail/:id" element={<MovieDetail />} />
           
          </Routes>
        </Router>
      </>
    </MyState>
  );
}

export default App;
