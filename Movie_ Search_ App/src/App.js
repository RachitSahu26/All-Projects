
import React from 'react'
import SearchMovie from "./components/SearchMovie";
import './App.scss';


const App = () => {
    return (
        <div className="container">
            <h1 className="title">React Movie Search</h1>
            <SearchMovie />
        </div>
    )
}

export default App
