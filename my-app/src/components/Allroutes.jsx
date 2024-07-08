import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Movies from "../pages/Movies"
import TvSeries from "../pages/TvSeries" 
import Bookmark from "../pages/Bookmark"
import SingleDetail from "../pages/SingleDetail"

function Allroutes() {
  return (
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/movies' element={<Movies/> } />
        <Route path='/tvseries' element={<TvSeries /> } />
        <Route path='/bookmark' element={<Bookmark/> } />
        <Route path='/detail/:id' element={<SingleDetail /> } />
        <Route path='*' element={<h1>No routes</h1> } />
      </Routes>
  )
}

export default Allroutes
