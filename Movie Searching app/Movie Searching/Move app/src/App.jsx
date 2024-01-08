import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import SearchBar from './Components/SearchBar/SearchBar'
import CardArea from './Components/CartArea.jsx/CardArea'
import MyState from './Context/Data/MyState'
// import MoveCard from './Components/Movie Card/MoveCard'
function App() {
  return (
    <MyState>


      <div>

        <NavBar />

        <div className="bg">
          <SearchBar />
          <CardArea />

        </div>

      </div>

    </MyState>
  )
}

export default App