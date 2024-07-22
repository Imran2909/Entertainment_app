import React, { useEffect } from 'react'
import styles from "./bookmark.module.css"
import Navbar from '../components/Navbar'
import Component from '../components/Component';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesBookmark, getTvSeriesBookmark, requestAction, requestFetchBookmarkMovies, requestFetchBookmarkTvSeries } from '../redux/action';
import SeriesBookmark from './SeriesBookmark';


function Bookmark() {
  //
  const loading = useSelector((store) => store.isLoading);
  const error = useSelector((store) => store.isError);
  const data = useSelector((store) => store.movies);
  const moviesBookmark = useSelector((store) => store.moviesBookmark)
  const tvSeriesBookmark = useSelector((store) => store.tvSeriesBookmark)
  const moviesBookmarkData = useSelector((store) => store.moviesBookmarkData)
  const tvSeriesBookmarkData = useSelector((store) => store.tvSeriesBookmarkData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestAction())
    dispatch(getMoviesBookmark())
    dispatch(getTvSeriesBookmark())
    dispatch(requestFetchBookmarkMovies())
    dispatch(requestFetchBookmarkTvSeries())
    // console.log(moviesBookmarkData);
  }, [dispatch])

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
            moviesBookmarkData && moviesBookmarkData.map((el, ind) => (
              <Component key={el.id} {...el} IDe={1} />
            ))
        }
      </div>
      <div className={styles.heading1} >
        Tv Series
      </div>
      <div className={styles.container1}>
        {
          loading ? <div className={styles.spinner}></div> : error ? <h1>Something went wrong</h1> :
          tvSeriesBookmarkData && tvSeriesBookmarkData.map((el, ind) => (
              <Component key={el.id} {...el} IDe={22} />
            ))
        }
      </div>

        
    </div>
  )
}

export default Bookmark








