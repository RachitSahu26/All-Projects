import axios from "axios";



const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDdkODE2MmYwYTE2ZmFlMDI5MzkwMmJmMzJiNjU2MSIsInN1YiI6IjY0YmViOTFjYjg2NWViMDExY2EwZDYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4-by30aCD9EUe2jjUAgYik-X3Osqir9Atg8VOSrNtdU"
const headers = {
    Authorization: "bearer " + TMDB_TOKEN,

}
 const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};


export default fetchDataFromApi;