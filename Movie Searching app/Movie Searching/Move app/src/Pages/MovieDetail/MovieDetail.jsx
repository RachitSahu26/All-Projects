import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../../Context/Data/MyContext';
import Loader from '../../Components/Loader/Loader';

function MovieDetail() {
  const context = useContext(MyContext);
  const { selectedMovieData, setSelectedMovieData, loading, setLoading } = context;
  const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

  const { id } = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63`);
        const data = await res.json();
        setSelectedMovieData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, setLoading, setSelectedMovieData]);

  if (loading) {
    return <Loader />;
  }

  const {
    original_title,
    release_date,
    title,
    poster_path,
    popularity,
    original_language,
    spoken_languages,
    overview,
  } = selectedMovieData;

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img src={baseImageUrl + poster_path} alt={title} className="rounded-lg" />
        </div>
        <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold"> Title: {original_title}</h1>
          <p className="text-gray-600">Year: {release_date}</p>
          <p className="text-gray-600">Language: {original_language}</p>
          <p className="text-gray-600">Popularity: {popularity}</p>
          <p className="text-gray-600">Overview: {overview}</p>
          {spoken_languages && (
            <p className="text-gray-600">
              Spoken Languages: {spoken_languages.map(lang => lang.name).join(', ')}
            </p>
          )}
          <hr className="my-4" />
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
