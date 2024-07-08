import React, { useEffect, useState } from 'react';
import styles from './xscrollBox.module.css';
import axios from 'axios'
import { Link, Route } from 'react-router-dom'
import { TbMovie } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";

function XscrollBox(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await axios.get(props.api)
                setData(fetchedData.data.results)
                console.log("xscroll", fetchedData.data.results)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    return (
        <div className={styles.box1}>
            <div className={styles.title}>
                Trending
            </div>
            <div className={styles.trending}>
                {
                    data.length > 0 && data?.map((el, ind) => {
                        return <div className={styles.box} key={el.id} >
                            <div className={styles.bookmark} >
                            <FaRegBookmark />
                            </div>
                            <Link to={`detail/${el.id}`} >
                                <img src={`https://image.tmdb.org/t/p/w300${el.backdrop_path}`} alt="" />
                            <p className={styles['josefin-sans']} >{el.release_date.slice(0, 4)} <span className={styles.dot} ></span> <TbMovie className={styles.small} />
                                <span className={styles.media} >Movie</span>
                                <span className={styles.dot} ></span>
                                <span className={styles.media}> {el.adult ? "E" : "PG"}</span>
                            </p>
                            <h2 className={styles['josefin-sans']}> {el.title}  </h2>
                            </Link>
                        </div>
                    })
                }
                {
                    data.length > 0 && data?.map((el, ind) => {
                        return <div className={styles.box} key={el.id} >
                            <div className={styles.bookmark} >
                            <FaRegBookmark />
                            </div>
                            <Link to={`detail/${el.id}`} >
                                <img src={`https://image.tmdb.org/t/p/w300${el.backdrop_path}`} alt="" />
                            <p className={styles['josefin-sans']} >{el.release_date.slice(0, 4)} <span className={styles.dot} ></span> <TbMovie className={styles.small} />
                                <span className={styles.media} >Movie</span>
                                <span className={styles.dot} ></span>
                                <span className={styles.media}> {el.adult ? "E" : "PG"}</span>
                            </p>
                            <h2 className={styles['josefin-sans']}> {el.title}  </h2>
                            </Link>
                        </div>
                    })
                }
               
            </div>
        </div>
    );
}

export default XscrollBox;
