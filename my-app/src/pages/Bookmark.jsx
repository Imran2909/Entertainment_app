import React, { useEffect } from 'react'
import styles from "./bookmark.module.css"
import Navbar from '../components/Navbar'
import Component from '../components/Component';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesBookmark, getTvSeriesBookmark, requestAction, requestFetchBookmarkMovies, requestFetchBookmarkTvSeries } from '../redux/action';


function Bookmark() {
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
        dispatch(requestFetchBookmarkMovies())
        dispatch(requestFetchBookmarkTvSeries())
    }, [dispatch])


    // return (
    //   <div className={styles.box} >
    //     <div className={styles.navbar}>
    //       <Navbar text="movies" />
    //     </div>
    //     <div className={styles.heading} >
    //       Movies
    //     </div>
    //     <div className={styles.container}>
    //       {
    //         loading ? <div className={styles.spinner}></div> : error ? <h1>Something went wrong</h1> :
    //           moviesBookmarkData.length>0 ? moviesBookmarkData && moviesBookmarkData.map((el, ind) => (
    //             <Component key={el.id} {...el} IDe={1} /> 
    //           )): <h1 style={{width:"600px"}} >No movies in bookmark</h1>
    //       }
    //     </div>
    //     <div className={styles.heading1} >
    //       Tv Series
    //     </div>
    //     <div className={styles.container1}>
    //       {
    //         loading ? <div className={styles.spinner}></div> : error ? <h1>Something went wrong</h1> :
    //         tvSeriesBookmarkData.length>0 ? tvSeriesBookmarkData && tvSeriesBookmarkData.map((el, ind) => (
    //             <Component key={el.id} {...el} IDe={22} />
    //           )): <h1 style={{width:"600px"}}>No tv series in bookmark</h1>
    //       }
    //     </div>
    //   </div>
    // ) 


    return (
        <div className={styles.box}>
            <div className={styles.navbar}>
                {/* <Navbar text="movies" /> */}
                <h2>Bookmark</h2>
            </div>
            <div className={styles.heading}>
                Movies
            </div>
            <div className={styles.container}>
                {
                    loading ? <div className={styles.spinner}></div> : error ? <h1>Something went wrong</h1> :
                        moviesBookmarkData.length > 0 ? moviesBookmarkData.map((el) => (
                            <Component key={el.id} {...el} IDe={1} />
                        )) : <h1 style={{ width: "600px", color: "white", fontSize: "24px" }} >No movies in bookmark</h1>
                }
            </div>
            <div className={styles.heading1}>
                Tv Series
            </div>
            <div className={styles.container1}>
                {
                    loading ? <div className={styles.spinner}></div> : error ? <h1>Something went wrong</h1> :
                        tvSeriesBookmarkData.length > 0 ? tvSeriesBookmarkData.map((el) => (
                            <Component key={el.id} {...el} IDe={22} />
                        )) : <h1 style={{ width: "600px", color: "white", fontSize: "24px" }} >No tv series in bookmark</h1>
                }
            </div>
        </div>
    );


}

export default Bookmark








