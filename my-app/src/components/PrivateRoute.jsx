// import React from 'react'
// import { Navigate, useLocation } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import Modal2 from './Modal2'


// function PrivateRoute({ children }) {
//     const location = useLocation()
//     console.log(location.pathname,"pr")
//     const auth = useSelector((store) => store.isAuth)
//     return auth ? children : <>{<Modal2/> }<Navigate state={location.pathname} to={"/login"} /></>
// }


// export default PrivateRoute






import React, { useState, useEffect } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal2 from './Modal2';

function PrivateRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.isAuth);
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    // Redirect to login page
    setShowModal(false);
    navigate('/login', { state: { from: location.pathname } });
  };

  const handleClose = () => {
    // Close the modal
    setShowModal(false);
    navigate(location.pathname)
  };

  useEffect(() => {
    if (!auth) {
      setShowModal(true);
    }
  }, [auth]);

  return (
    <>
      {showModal && (
        <Modal2
          message="You are not authenticated, please login first."
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      )}
      {auth ? children : null}
    </>
  );
}

export default PrivateRoute;
