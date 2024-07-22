
// import React, { useEffect, useState } from 'react';
// import styles from './xscrollBox.module.css';
// import axios from 'axios'
// import { Link, Route } from 'react-router-dom'
// import { TbMovie } from "react-icons/tb";
// import { FaRegBookmark } from "react-icons/fa";
// import { IoMdBookmark } from "react-icons/io";
// import { Tooltip, Button } from '@chakra-ui/react'
// import { useDispatch, useSelector } from 'react-redux';
// import { addBookmark, removeBookmark, requestAction, requestDataFetch, requestTrendingDataFetch, trendingDataFetchCompleted } from '../redux/action'

// function XscrollBox(props) {
//     const bookmark = useSelector((store) => store.bookmark)
//     const dispatch = useDispatch()
//     const loading = useSelector((store) => store.isLoading)
//     const error = useSelector((store) => store.isError)
//     const data = useSelector((store) => store.trendingData)

//     useEffect(() => {
//         dispatch(requestAction())
//         dispatch(requestTrendingDataFetch(props.api))

//     }, [loading, error])

//     const AddBookmark = (ID) => {
//         dispatch(addBookmark(ID))

//     }
//     const RemoveBookmark = (ID) => {
//         dispatch(removeBookmark(ID))
//     }

//     return (
//         <div className={styles.box1}>
//             <div className={styles.title}>
//                 Trending
//             </div>
//             <div className={styles.trending}>
//                 {
//                     loading ? "Loading" : error ? "Error" :
//                     data.length > 0 && data?.map((el, ind) => {
//                         return <div className={styles.box} key={el.id} >
//                             <div className={styles.cover} >
//                                 <div className={styles.bookmark} >
//                                     <Tooltip label='' placement='top' bg='teal.600'>
//                                         <Button style={{ border: "none" }} >
//                                             {
//                                                 bookmark.length > 0 && bookmark.includes(el.id) ? <IoMdBookmark onClick={() => RemoveBookmark(el.id)} className={styles.booked} /> :
//                                                     <FaRegBookmark onClick={() => AddBookmark(el.id)} />
//                                             }
//                                         </Button>
//                                     </Tooltip>
//                                 </div>
//                                 <Link to={`movieDetail/${el.id}`} >
//                                     <img src={`https://image.tmdb.org/t/p/w300${el.backdrop_path}`} alt="" className={styles.img} />
//                                     <p className={styles['josefin-sans']} >{el.release_date.slice(0, 4)} <span className={styles.dot} ></span> <TbMovie className={styles.small} />
//                                         <span className={styles.media} >Movie</span>
//                                         <span className={styles.dot} ></span>
//                                         <span className={styles.media}> {el.adult ? "E" : "PG"}</span>
//                                     </p>
//                                     <h2 className={styles['josefin-sans']}> {el.title}  </h2>
//                                 </Link>
//                             </div>
//                         </div>
//                     })
//                 }

//                 {
//                     loading ? "Loading" : error ? "Error" :
//                     data.length > 0 && data?.map((el, ind) => {
//                         return <div className={styles.box} key={el.id} >
//                             <div className={styles.cover} >
//                                 <div className={styles.bookmark} >
//                                     <Tooltip label='' placement='top' bg='teal.600'>
//                                         <Button style={{ border: "none" }} >
//                                             {
//                                                 bookmark.length > 0 && bookmark.includes(el.id) ? <IoMdBookmark onClick={() => RemoveBookmark(el.id)} className={styles.booked} /> :
//                                                     <FaRegBookmark onClick={() => AddBookmark(el.id)} />
//                                             }
//                                         </Button>
//                                     </Tooltip>
//                                 </div>
//                                 <Link to={`movieDetail/${el.id}`} >
//                                     <img src={`https://image.tmdb.org/t/p/w300${el.backdrop_path}`} alt="" className={styles.img} />
//                                     <p className={styles['josefin-sans']} >{el.release_date.slice(0, 4)} <span className={styles.dot} ></span> <TbMovie className={styles.small} />
//                                         <span className={styles.media} >Movie</span>
//                                         <span className={styles.dot} ></span>
//                                         <span className={styles.media}> {el.adult ? "E" : "PG"}</span>
//                                     </p>
//                                     <h2 className={styles['josefin-sans']}> {el.title}  </h2>
//                                 </Link>
//                             </div>
//                         </div>
//                     })
//                 }
               


//             </div>
//         </div>
//     );
// }

// export default XscrollBox;






















import React, { useEffect } from 'react';
import styles from './xscrollBox.module.css';
import { Link } from 'react-router-dom';
import { TbMovie } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";
import { Tooltip, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {  addMovieBookmark, getMoviesBookmark, removeBookmark, removeMovieBookmark, requestAction, requestTrendingDataFetch } from '../redux/action';

function XscrollBox(props) {
    const moviesBookmark = useSelector((store) => store.moviesBookmark);
    const dispatch = useDispatch();
    const loading = useSelector((store) => store.isLoading);
    const error = useSelector((store) => store.isError);
    const data = useSelector((store) => store.trendingData);

    useEffect(() => {
        dispatch(requestAction());
        dispatch(requestTrendingDataFetch(props.api));
        dispatch(getMoviesBookmark())
    }, [dispatch, props.api]);

    const addBookmarkHandler = (ID) => {
        dispatch(addMovieBookmark({ "movieId": ID }));
    };

    const removeBookmarkHandler = (ID) => {
        dispatch(removeMovieBookmark({ "movieId": ID }));
    };


    return (
        <div className={styles.box1}>
            <div className={styles.title}>
                Trending
            </div>
            <div className={styles.trending}>
                {
                loading ? <div className={styles.spinner}></div> : error ? <h1>Something went wrong</h1> :
                    data.length > 0 && data.map((el) => (
                        <div className={styles.box} key={el.id}>
                            <div className={styles.cover}>
                                <div className={styles.bookmark}>
                                    <Tooltip label='' placement='top' bg='teal.600'>
                                        <Button style={{ border: "none" }}>
                                            {moviesBookmark.includes(el.id) ? 
                                                <IoMdBookmark onClick={() => removeBookmarkHandler(el.id)} className={styles.booked} /> : 
                                                <FaRegBookmark onClick={() => addBookmarkHandler(el.id)} />
                                            }
                                        </Button>
                                    </Tooltip>
                                </div>
                                <Link to={`movieDetail/${el.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w300${el.backdrop_path}`} alt="" className={styles.img} />
                                    <p className={styles['josefin-sans']}>
                                        {el.release_date.slice(0, 4)} <span className={styles.dot}></span> 
                                        <TbMovie className={styles.small} />
                                        <span className={styles.media}>Movie</span>
                                        <span className={styles.dot}></span>
                                        <span className={styles.media}>{el.adult ? "E" : "PG"}</span>
                                    </p>
                                    <h2 className={styles['josefin-sans']}>{el.title.length > 22 ? el.title.slice(0,22)+"..." : el.title }</h2>
                                </Link>
                            </div>
                        </div>
                    ))
                }
                {
                loading ? "" : error ? "" :
                    data.length > 0 && data.map((el) => (
                        <div className={styles.box} key={el.id}>
                            <div className={styles.cover}>
                                <div className={styles.bookmark}>
                                    <Tooltip label='' placement='top' bg='teal.600'>
                                        <Button style={{ border: "none" }}>
                                            {moviesBookmark.includes(el.id) ? 
                                                <IoMdBookmark onClick={() => removeBookmarkHandler(el.id)} className={styles.booked} /> : 
                                                <FaRegBookmark onClick={() => addBookmarkHandler(el.id)} />
                                            }
                                        </Button>
                                    </Tooltip>
                                </div>
                                <Link to={`movieDetail/${el.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w300${el.backdrop_path}`} alt="" className={styles.img} />
                                    <p className={styles['josefin-sans']}>
                                        {el.release_date.slice(0, 4)} <span className={styles.dot}></span> 
                                        <TbMovie className={styles.small} />
                                        <span className={styles.media}>Movie</span>
                                        <span className={styles.dot}></span>
                                        <span className={styles.media}>{el.adult ? "E" : "PG"}</span>
                                    </p>
                                    <h2 className={styles['josefin-sans']}>
                                       {el.title.length > 22 ? el.title.slice(0,22)+"..." : el.title }
                                        </h2>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default XscrollBox;
