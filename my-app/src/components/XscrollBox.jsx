import React, { useEffect } from 'react';
import styles from './xscrollBox.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { TbMovie } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { addMovieBookmark, getMoviesBookmark, removeMovieBookmark, requestAction, requestTrendingDataFetch } from '../redux/action';
import { useToast } from '@chakra-ui/react'



function XscrollBox(props) {
    const moviesBookmark = useSelector((store) => store.moviesBookmark);
    const dispatch = useDispatch();
    const loading = useSelector((store) => store.isLoading);
    const error = useSelector((store) => store.isError);
    const data = useSelector((store) => store.trendingData);
    const isAuth = useSelector((store) => store.isAuth);
    const toast = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(requestAction());
        dispatch(requestTrendingDataFetch(props.api));
        if (isAuth) {
            dispatch(getMoviesBookmark());
        }
    }, [dispatch, props.api, isAuth]);

    const addBookmarkHandler = (ID) => {
        if (isAuth) {
            toast({
                title: `"${ID.title}" movie added to bookmark`,
                status: 'info',
                duration: 4000,
                position: 'top',
                isClosable: true,
            })

            dispatch(addMovieBookmark({ "movieId": ID.id }));
        } else {
            toast({
                title: `Please authenticated to continue`,
                status: 'warning',
                duration: 4000,
                position: 'top',
                isClosable: true,
            })
            navigate('/login')
        }
    };

    const removeBookmarkHandler = (ID) => {
        if (isAuth) {
            toast({
                title: ` "${ID.title}" movie removed from bookmark`,
                status: 'info',
                duration: 4000,
                position: 'top',
                isClosable: true,
            })
            dispatch(removeMovieBookmark({ "movieId": ID.id }));
        } else {
            toast({
                title: `Please authenticated to continue`,
                status: 'warning',
                duration: 4000,
                position: 'top',
                isClosable: true,
            })
            navigate('/login')
        }
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
                                        {/* <Tooltip label='' placement='top' bg='teal.600'> */}
                                        <button style={{ border: "none" }}>
                                            {isAuth && moviesBookmark.includes(el.id) ?
                                                <IoMdBookmark onClick={() => removeBookmarkHandler(el)} className={styles.booked} /> :
                                                <FaRegBookmark onClick={() => addBookmarkHandler(el)} />
                                            }
                                        </button>
                                        {/* </Tooltip> */}
                                    </div>
                                    <Link to={`movieDetail/${el.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w300${el.backdrop_path}`} alt="" className={styles.img} />
                                        <p className={styles['josefin-sans']}>
                                            {el.release_date.slice(0, 4)} <span className={styles.dot}></span>
                                            {/* <TbMovie className={styles.small} /> */}
                                            <span className={styles.media}>Movie</span>
                                            <span className={styles.dot}></span>
                                            <span className={styles.media}>{el.adult ? "E" : "PG"}</span>
                                        </p>
                                        <h2 className={styles['josefin-sans']}>{el.title.length > 22 ? el.title.slice(0, 22) + "..." : el.title}</h2>
                                    </Link>
                                </div>
                            </div>
                        ))
                }
                {
                    loading ? <div className={styles.spinner}></div> : error ? <h1>Something went wrong</h1> :
                        data.length > 0 && data.map((el) => (
                            <div className={styles.box} key={el.id}>
                                <div className={styles.cover}>
                                    <div className={styles.bookmark}>
                                        {/* <Tooltip label='' placement='top' bg='teal.600'> */}
                                        <button style={{ border: "none" }}>
                                            {isAuth && moviesBookmark.includes(el.id) ?
                                                <IoMdBookmark onClick={() => removeBookmarkHandler(el.id)} className={styles.booked} /> :
                                                <FaRegBookmark onClick={() => addBookmarkHandler(el.id)} />
                                            }
                                        </button>
                                        {/* </Tooltip> */}
                                    </div>
                                    <Link to={`movieDetail/${el.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w300${el.backdrop_path}`} alt="" className={styles.img} />
                                        <p className={styles['josefin-sans']}>
                                            {el.release_date.slice(0, 4)} <span className={styles.dot}></span>
                                            {/* <TbMovie className={styles.small} /> */}
                                            <span className={styles.media}>Movie</span>
                                            <span className={styles.dot}></span>
                                            <span className={styles.media}>{el.adult ? "E" : "PG"}</span>
                                        </p>
                                        <h2 className={styles['josefin-sans']}>{el.title.length > 22 ? el.title.slice(0, 22) + "..." : el.title}</h2>
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
