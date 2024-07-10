import React, { useEffect, useState } from 'react'
import styles from './recomended.module.css'
import Component from './Component'
import axios from 'axios';

function Recomended() {
    const [data, setData] = useState([])
    const apiKey = '5ae304b91cd12d71e100db44c6812cb6';
    const movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=5ae304b91cd12d71e100db44c6812cb6&language=en-US&page=1`;
    const tvUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=5ae304b91cd12d71e100db44c6812cb6&language=en-US&page=1`;

    useEffect(() => {
        async function fetchData() {
            try {
                const movieResponse = await axios.get(movieUrl);
                const tvResponse = await axios.get(tvUrl);
                const combinedResults = [...movieResponse.data.results, ...tvResponse.data.results];
                console.log("top rated", combinedResults);
                setData(combinedResults)
                return combinedResults
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className={styles.container} >
                <div className={styles.heading} >
                    Recommended for you
                </div>
                <div className={styles.component} >
                    {
                        data.length > 0 && data?.map((el, ind) => {
                            return (
                                <Component key={el.id} {...el} ID={ind} />
                           )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Recomended
