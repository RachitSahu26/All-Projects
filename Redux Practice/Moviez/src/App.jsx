import React from 'react';



import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate, // Import Navigate component
  // useLocation, // Import useLocation hook

} from 'react-router-dom';
import Home from './Page/Home/Home.jsx';
// import Home from './Page/Home.jsx';
// import About from './Page/About.jsx';
// import Contact from './Page/Contact.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />


      </Routes>
    </Router>
  );
}

export default App;
