import React, { useState } from 'react'
import MyContext from './MyContext'

function MyState(props) {

    const [movieSearch, setMovieSearch] = useState("");
    // const [loading, setLoading] = useState(false);
    const [allMovieData, setAllMovieData] = useState([]);

    const fetchData = async () => {
        try {
            // setLoading(true);
            const res = await fetch(`http://www.omdbapi.com/?s=${movieSearch}&apikey=cae6e323`)
            const data = await res.json();
            setAllMovieData(data.Search);
            console.log(data.Search)

            // setLoading(false);


        } catch (error) {
            console.log(error)
            // setLoading(false)
        }

    }

    return (
        <MyContext.Provider value={{ fetchData, movieSearch, setMovieSearch, allMovieData, setAllMovieData }}>

            {props.children}

        </MyContext.Provider>
    )
}

export default MyState