import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import  MyContext from '../../Context/Data/MyContext';
import Loader from '../../Components/Loader/Loader';

function MovieDetail() {
const context=useContext( MyContext);
const {  selectedMovieData,setSelectedMovieData, loading, setLoading  }=context; 
                   
    const { id } = useParams();
    // console.log(paramId)


    useEffect(() => {

        const movieData = async () => {

            try {
                setLoading(true);
                const res = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=cae6e323`)
                const data = await res.json();
                setSelectedMovieData(data);
                console.log(data);
            setLoading(false);

            }
            catch (error) {
                console.log(error)
            setLoading(false);

            }


        }


movieData();



    }, [])




    const {
        Country,
        Awards,
        Actors,
        Director,
        Language,
        Plot,
        Rated,
        Title,
        Year,
        Poster,
        Released
      } = selectedMovieData;
      

if(loading){
    return   <Loader/>
}


    return (
   
   
   
   <div className="container mx-auto mt-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img src={Poster} alt={Title} className="rounded-lg" />
          </div>
          <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
            <h1 className="text-3xl font-bold"> Title:{Title}</h1>

            <p className="text-gray-600">Year:{Year}</p>
            <p className="text-gray-600">Release Date:{Released}</p>
            <p className="text-gray-600">Director: {Director}</p>
            <p className="text-gray-600"> Language:{Language}</p>
            <p className="text-gray-600">Actor: {Actors}</p>
            <p className="text-gray-600">Country: {Country}</p>
            <p className="text-gray-600">Award: {Awards}</p>

            <hr className="my-4" />
            <p className="text-lg">{Plot}</p>
          </div>
        </div>
      </div>
    )




}

export default MovieDetail