import { useState } from 'react'
import MovieGrid from "./MovieGrid";
import './SearchMovie.scss';

const SearchMovie = () => {

    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])

    const searchMovies = async (e) => {
        e.preventDefault()

        const url = `https://api.themoviedb.org/3/search/movie?api_key=7571c76917940ad43e88437d162f8431&language=en-US&query=${query}&page=1`;

        try {
            const res = await fetch(url);
            const data  = await res.json();
            console.log(data.results);
            setMovies(data.results)
        }catch(err){
            console.error(err);
        }
    }

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label htmlFor="query" className="label">Movie Name</label>
                <input 
                    type="text" 
                    name="query" 
                    className="search-movie" 
                    placeholder="Search Movie" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <button className="search-button" type="submit" >Search</button>
            </form>
            <MovieGrid movies={movies} />
        </>
    )
}

export default SearchMovie
