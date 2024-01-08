import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import SearchBar from './Components/SearchBar/SearchBar'
import CardArea from './Components/CartArea.jsx/CardArea'
// import MoveCard from './Components/Movie Card/MoveCard'

function App() {
  return (
    <div>

      <NavBar />

      <div className="bg">
        <SearchBar />
        <CardArea />

      </div>

    </div>
  )
}

export default App