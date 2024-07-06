import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Movies from "../pages/Movies"
import TvSeries from "../pages/TvSeries" 
import Bookmark from "../pages/Bookmark"

function Allroutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<Movies/> } />
        <Route path='/tvseries' element={<TvSeries /> } />
        <Route path='/bookmark' element={<Bookmark/> } />
      </Routes>
    </div>
  )
}

export default Allroutes
