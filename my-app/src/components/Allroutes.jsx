import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Movies from "../pages/Movies"
import TvSeries from "../pages/TvSeries"
import Bookmark from "../pages/Bookmark"
import SingleDetail from "../pages/SingleDetail"
import SingleSeries from '../pages/SingleSeries'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import PrivateRoute from './PrivateRoute'


function Allroutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/movies' element={<Movies />} />
      <Route path='/tvseries' element={<TvSeries />} />
      <Route path='/bookmark' element={
        <PrivateRoute>
          <Bookmark />
        </PrivateRoute>
      }
      />
      <Route path='/movieDetail/:id' element={<SingleDetail />} />
      <Route path='/tvSeriesDetail/:id' element={<SingleSeries />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path='*' element={<h1>No routes</h1>} />
    </Routes>
  )
}

export default Allroutes
