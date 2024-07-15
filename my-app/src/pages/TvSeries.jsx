import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './movies.module.css';
import Navbar from '../components/Navbar';
import Component from '../components/Component';
import { useDispatch, useSelector } from 'react-redux';
import { requestAction, requestTvSeriesDataFetch } from '../redux/action';


function TvSeries() {
  const loading = useSelector((store) => store.isLoading);
  const error = useSelector((store) => store.isError);
  const data = useSelector((store) => store.movies);
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()

  const handlePage = (val) => {
    setPage(page + val)
  }
  

  useEffect(() => {
    dispatch(requestAction())
    dispatch(requestTvSeriesDataFetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=5ae304b91cd12d71e100db44c6812cb6&language=en-US&page=1`))
  }, [dispatch]);


  return (
    <div className={styles.box} >
      <div className={styles.navbar}>
        <Navbar text="TV series" />
      </div>
      <div className={styles.heading} >
        Tv Series
      </div>
      <div className={styles.container}>
        {
        loading ? <div className={styles.spinner}></div> : error ? <h1>Something went wrong</h1> :
        data && data.map((el, ind) => (
          <Component key={el.id} {...el} IDe={22} />
        ))}
      </div>
      <div className={styles.pagination} >
        <button onClick={() => { handlePage(-1) }} >-</button>
        <button disabled >{page}</button>
        <button onClick={() => { handlePage(1) }} >+</button>
      </div>
    </div>
  );
}

export default TvSeries;
