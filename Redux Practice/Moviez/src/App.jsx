import React, { useEffect } from 'react'
import './App.css'
// import { fetchDataFromApi } from "../src/utils/api.js"
import { useDispatch, useSelector } from 'react-redux'
import HomeSlice, { getApiConfiguration } from './store/homeSlice.js'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import SearchResult from './Pages/Searched Result/SearchResult.jsx'
import Explore from './Pages/Explore/Explore.jsx'
import Page_404 from './Pages/404/Page_404.jsx'
import Detail from './Pages/Detail/Detail.jsx'
import Home from './Pages/Home/Home.jsx'
import fetchDataFromApi from './utils/api.js';
import MyState from './Hooks/MyState.jsx';

function App() {
  const dispatch = useDispatch()
  const { URlData } = useSelector((state) => state.home);
  console.log(URlData)


  useEffect(() => {
    testApi()
  }, [])  

  const testApi = () => {
    fetchDataFromApi("/configuration")
      .then((res) => {

        console.log(res);  



const url = {
  backdrop: res.images.secure_base_url + "original",
  poster: res.images.secure_base_url + "original",
  profile: res.images.secure_base_url + "original",
};

dispatch(getApiConfiguration(url));

      })
  }

  return (


    <MyState>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='/:mediaType/:id' element={<Detail />} />
          <Route path='*' element={<Page_404 />} />
        </Routes>

      </BrowserRouter>
    </MyState>
  )
}

export default App
