import React, { useState, useEffect } from 'react';
import styles from './movies.module.css';
import Navbar from '../components/Navbar';
import Component from '../components/Component';
import { useDispatch, useSelector } from 'react-redux';
import { requestAction, requestMovieDataFetch } from '../redux/action';

function Movies() {
  const loading = useSelector((store) => store.isLoading);
  const error = useSelector((store) => store.isError);
  const data = useSelector((store) => store.movies);
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(requestAction())
    dispatch(requestMovieDataFetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=5ae304b91cd12d71e100db44c6812cb6&language=en-US&page=${page}`))
  }, [dispatch]);
  
  return (
    <div className={styles.box} >
      <div className={styles.navbar}>
        <Navbar text="movies" />
      </div>
      <div className={styles.heading} >
        Movies
      </div>
      <div className={styles.container}>
        {
          loading ? <div className={styles.spinner}></div> : error ? <h1>Something went wrong</h1> :
            data && data.map((el, ind) => (
              <Component key={el.id} {...el} IDe={ind} />
            ))}
      </div>
    </div>
  );
}

export default Movies;
