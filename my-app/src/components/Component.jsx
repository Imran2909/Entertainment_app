import React, { useEffect } from 'react';
import styles from './component.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieBookmark, addTvSeriesBookmark, getMoviesBookmark, getTvSeriesBookmark, removeMovieBookmark, removeTvSeriesBookmark } from '../redux/action';
import { FaRegBookmark } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

function Component({ IDe, ...props }) {
    const moviesBookmark = useSelector((store) => store.moviesBookmark);
    const tvSeriesBookmark = useSelector((store) => store.tvSeriesBookmark);
    const isAuth = useSelector((store) => store.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast()

    useEffect(() => {
        if (isAuth) {
            dispatch(getMoviesBookmark());
            dispatch(getTvSeriesBookmark());
        }
    }, [dispatch, isAuth]);

    const AddBookmark = (ID) => {
        if (!isAuth) {
            toast({
                title: `Please authenticated to continue`,
                status: 'warning',
                duration: 4000,
                position: 'top',
                isClosable: true,
            })
            navigate("/login");
        } else {
            if (IDe < 20) {
                toast({
                    title: `"${ID.title}" movie added to bookmark`,
                    status: 'info',
                    duration: 4000,
                    position: 'top',
                    isClosable: true,
                })
                dispatch(addMovieBookmark({ "movieId": ID.id }));
                console.log(ID.id);
            } else {
                toast({
                    title: `"${ID.name}" series added to bookmark`,
                    status: 'info',
                    duration: 4000,
                    position: 'top',
                    isClosable: true,
                })
                dispatch(addTvSeriesBookmark({ "movieId": ID.id }));
            }
        }
    };

    const RemoveBookmark = (ID) => {
        if (IDe < 20) {
            toast({
                title: ` "${ID.title}" movie removed from bookmark`,
                status: 'info',
                duration: 4000,
                position: 'top',
                isClosable: true,
            })
            dispatch(removeMovieBookmark({ "movieId": ID.id }));
            dispatch(getMoviesBookmark());
        } else {
            toast({
                title: ` "${ID.name}" series removed from bookmark`,
                status: 'info',
                duration: 4000,
                position: 'top',
                isClosable: true,
            })
            dispatch(removeTvSeriesBookmark({ "movieId": ID.id }));
            dispatch(getTvSeriesBookmark());
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.bookmark}>
                    {IDe < 20 ?
                        (isAuth && moviesBookmark.length > 0 && moviesBookmark.includes(props.id)) ?
                            <IoMdBookmark onClick={() => RemoveBookmark(props)} className={styles.booked} /> :
                            <FaRegBookmark onClick={() => AddBookmark(props)} /> :
                        (isAuth && tvSeriesBookmark.length > 0 && tvSeriesBookmark.includes(props.id)) ?
                            <IoMdBookmark onClick={() => RemoveBookmark(props)} className={styles.booked} /> :
                            <FaRegBookmark onClick={() => AddBookmark(props)} />
                    }
                </div>
                {IDe < 20 ?
                    <Link to={`/movieDetail/${props.id}`}>
                        {
                            props.backdrop_path && props.backdrop_path ? <img src={`https://image.tmdb.org/t/p/w200${props.backdrop_path}`} alt="" /> :
                                <img src={`https://static.vecteezy.com/system/resources/thumbnails/012/657/549/small/illustration-negative-film-reel-roll-tapes-for-movie-cinema-video-logo-vector.jpg`} style={{
                                    height: "125px"
                                }} alt="" />
                        }

                    </Link> :
                    <Link to={`/tvSeriesDetail/${props.id}`}>
                        {
                            props.backdrop_path && props.backdrop_path ? <img src={`https://image.tmdb.org/t/p/w200${props.backdrop_path}`} alt="" /> :
                                <img src={`https://static.vecteezy.com/system/resources/thumbnails/012/657/549/small/illustration-negative-film-reel-roll-tapes-for-movie-cinema-video-logo-vector.jpg`} style={{
                                    height: "125px"
                                }} alt="" />
                        }

                    </Link>
                }
                <div className={styles.desc}>
                    <p className={styles['josefin-sans']}>
                        <span>
                            {props.release_date ? props.release_date : props.first_air_date}
                            {/* {props.release_date} */}
                        </span>
                        <span className={styles.dot}></span>
                        {/* <TbMovie className={styles.small} /> */}
                        <span className={styles.media}>
                            {IDe < 20 ? "Movie" : "TV Show"}
                        </span>
                        <span className={styles.dot}></span>
                        <span className={styles.media}>{props.adult ? "E" : "PG"}</span>
                    </p>
                </div>
                <div className={styles.name}>
                    {props.title ?
                        (props.title.length > 21 ? props.title.slice(0, 20) + "..." : props.title) :
                        (props.name.length > 21 ? props.name.slice(0, 20) + "..." : props.name)
                    }
                </div>
            </div>
        </div>
    );
}

export default Component;
