import React, { useEffect } from 'react'
import styles from './component.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addMovieBookmark, addTvSeriesBookmark, getMoviesBookmark, getTvSeriesBookmark, removeMovieBookmark, removeTvSeriesBookmark } from '../redux/action'
import { FaRegBookmark } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';


function Component({ IDe, ...props }) {
    const moviesBookmark = useSelector((store) => store.moviesBookmark)
    const tvSeriesBookmark = useSelector((store) => store.tvSeriesBookmark)
    const auth = useSelector((store) => store.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const AddBookmark = (ID) => {
        if (!auth) {
            navigate("/login")
        } else {
            if (IDe < 20) {
                dispatch(addMovieBookmark({ "movieId": ID }))
            } else {
                dispatch(addTvSeriesBookmark({ "movieId": ID }))
            }
        }
    }
   
    useEffect(() => {
        dispatch(getMoviesBookmark())
        dispatch(getTvSeriesBookmark())
    }, [dispatch])
    
    const RemoveBookmark = (ID) => {
        if (IDe < 20) {
            dispatch(removeMovieBookmark({ "movieId": ID }))
            dispatch(getMoviesBookmark())
        } else {
            dispatch(removeTvSeriesBookmark({ "movieId": ID }))
            dispatch(getTvSeriesBookmark())
        }
    }

    return (
        <div>
            <div className={styles.container} >
                <div className={styles.bookmark} >
                    { IDe < 20 ?
                        moviesBookmark.length > 0 && moviesBookmark.includes(props.id) ? <IoMdBookmark onClick={() => RemoveBookmark(props.id)} className={styles.booked} /> :
                            <FaRegBookmark onClick={() => AddBookmark(props.id)} /> :
                        tvSeriesBookmark.length > 0 && tvSeriesBookmark.includes(props.id) ? <IoMdBookmark onClick={() => RemoveBookmark(props.id)} className={styles.booked} /> :
                            <FaRegBookmark onClick={() => AddBookmark(props.id)} />
                    }
                </div>
                {
                    IDe < 20 ? <Link to={`/movieDetail/${props.id}`}  >
                        <img src={`https://image.tmdb.org/t/p/w200${props.backdrop_path}`} alt="" />
                    </Link> : <Link to={`/tvSeriesDetail/${props.id}`}  >
                        <img src={`https://image.tmdb.org/t/p/w200${props.backdrop_path}`} alt="" />
                    </Link>
                }
                <div className={styles.desc} >
                    <p className={styles['josefin-sans']}>
                        <span>
                            {props.release_date && props.release_date ? props.release_date.slice(0, 4) : props.first_air_date.slice(0, 4)}
                        </span>
                        <span className={styles.dot}></span>
                        {/* <TbMovie className={styles.small} /> */}
                        <span className={styles.media}>{
                            IDe < 20 ? "Movie" : "TV Show"
                        }</span>
                        <span className={styles.dot}></span>
                        <span className={styles.media}>{props.adult ? "E" : "PG"}</span>
                    </p>
                </div>
                <div className={styles.name} >
                    {
                        props.title ?
                            props.title && props.title.length > 21 ? props.title.slice(0, 20) + "..." : props.title :
                            props.name && props.name.length > 21 ? props.name.slice(0, 20) + "..." : props.name
                    }
                </div>
            </div>
        </div>
    )
}


export default Component
