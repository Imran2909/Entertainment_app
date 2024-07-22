import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PrivateRoute({ children }) {
    const location = useLocation()
    console.log(location.pathname)
    const auth = useSelector((store) => store.isAuth)
    return auth ? children : <>{alert("Please login first")}<Navigate state={location.pathname} to={"/login"} /></>
}


export default PrivateRoute


 