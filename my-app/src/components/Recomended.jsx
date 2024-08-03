import React, { useEffect } from 'react';
import styles from './recomended.module.css';
import Component from './Component';
import { useDispatch, useSelector } from 'react-redux';
import { requestAction, requestRecommendedDateFetch } from '../redux/action';

function Recomended() {
    const apiKey = '5ae304b91cd12d71e100db44c6812cb6';
    const movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=5ae304b91cd12d71e100db44c6812cb6&language=en-US&page=1`;
    const tvUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=5ae304b91cd12d71e100db44c6812cb6&language=en-US&page=1`;
    const dispatch = useDispatch();
    
    const loading = useSelector((store) => store.isLoading);
    const error = useSelector((store) => store.isError);
    const data = useSelector((store) => store.recommendedData);

    useEffect(() => {
        const urls = { movieUrl, tvUrl };
        dispatch(requestAction());
        dispatch(requestRecommendedDateFetch(urls));
    }, [dispatch]);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.heading}>
                    Recommended for you
                </div>
                <div className={styles.component}>
                    {
                        loading ? <div className={styles.spinner}></div> :
                        error ? <h1>Something went wrong</h1> :
                        data.length > 0 && data.map((el, ind) => (
                            <Component key={el.id} {...el} IDe={ind} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Recomended;
