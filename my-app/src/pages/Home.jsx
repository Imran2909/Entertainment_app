import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import Navbar from '../components/Navbar';
import XscrollBox from '../components/XscrollBox';


function Home() {
    return (
        <div className={styles.main}>
            <div className={styles.top}>
                <Navbar text="movies or TV series" />
            </div>
            <div className={styles.content}>
                <XscrollBox api={`https://api.themoviedb.org/3/trending/movie/day?api_key=5ae304b91cd12d71e100db44c6812cb6`} />
            </div>
        </div>
    );
}

export default Home;
