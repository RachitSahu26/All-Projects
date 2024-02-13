import React from 'react';

import '../Home/Home.scss'; // Import the SCSS file

import MatchList from '../../Components/MatchList/MatchList.jsx';
import NavBar from '../../Components/NavBar/NavBar.jsx';

function Home() {
  return (
    <div className="home-container">
      <header>
        <nav>
       <NavBar/>
        </nav>
      </header>
      <main>
        <div>
          <MatchList />
        </div>
      </main>
      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  );
}

export default Home;
