import React, { useContext, useEffect, useState } from 'react'
import "./HeroBanner.scss";
import { useNavigate } from 'react-router-dom';
import MyContex from '../../../Hooks/Context';


// import {UserFetch} from "../../../Hooks/UserFetch.js"
function HeroBanner() {
  // ...................state for input data..........
  const [getInput, setGetInput] = useState("")
  // ...................state for background image data..........
  const [background, setBackground] = useState("");

  const ContextData = useContext(MyContex);
  const { data, UserFetch } = ContextData;




  const navigate = useNavigate()

  UserFetch("/movie/upcoming");
  useEffect(() => {
    const bgImg = data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bgImg)
console.log(bgImg)
  }, [data]);

  const getResult = () => {

    if (getInput.length > 0) {
      navigate(`/search/${getInput}`)
    }



  }

  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
          Discover Your Favorite Movies
        </h1>
        <p className="text-lg text-white mb-8">
          Explore a vast collection of movies and find your next favorite.
        </p>
        <div className="search-bar-container">
          <input
            type="text"
            value={getInput}
            placeholder="Search for movies..."
            className="search-bar-input"
            onChange={(e) => setGetInput(e.target.value)}
          />
          <button className="search-bar-button" onClick={getResult}>Search</button>
        </div>
      </div>
    </div>)
}

export default HeroBanner
