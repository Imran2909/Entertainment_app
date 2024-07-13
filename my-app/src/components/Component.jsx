import React from 'react'
import styles from './component.module.css'
import { TbMovie } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../redux/action'
import { FaRegBookmark } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";
import { Link, Route } from 'react-router-dom';



function Component({ IDe, ...props }) {
    const bookmark = useSelector((store) => store.bookmark)

    // console.log("props", props);
    const dispatch = useDispatch()
    const AddBookmark = (ID) => {
        dispatch(addBookmark(ID))
    }
    const RemoveBookmark = (ID) => {
        dispatch(removeBookmark(ID))
    }

    return (
        <div>
            <div className={styles.container} >
                <div className={styles.bookmark} >
                    {
                        bookmark.length > 0 && bookmark.includes(props.id) ? <IoMdBookmark onClick={() => RemoveBookmark(props.id)} className={styles.booked} /> :
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
                            {props.release_date ? props.release_date.slice(0, 4) : props.first_air_date.slice(0, 4)}
                        </span>
                        <span className={styles.dot}></span>
                        <TbMovie className={styles.small} />
                        <span className={styles.media}>{
                            IDe < 20 ? "Movie" : "TV Show"
                        }</span>
                        <span className={styles.dot}></span>
                        <span className={styles.media}>{props.adult ? "E" : "PG"}</span>
                    </p>
                </div>
                <div className={styles.name} >
                    {
                    IDe < 20 ?
                            props.title && props.title.length > 21 ? props.title.slice(0, 20) + "..." : props.title :
                            props.name && props.name.length > 21 ? props.name.slice(0, 20) + "..." : props.name
                    }
                </div>
            </div>
        </div>
    )
}


export default Component
