import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './movies.module.css';
import Navbar from '../components/Navbar';
import Component from '../components/Component';

function TvSeries() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1)

  const handlePage = (val) => {
    setPage(page + val)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=5ae304b91cd12d71e100db44c6812cb6&language=en-US&page=${page}`
        );
        setData(response.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div >
      <div className={styles.navbar}>
        <Navbar text="TV series" />
      </div>
      <div className={styles.heading} >
        Tv Series
      </div>
      <div className={styles.container}>
        {data && data.map((el, ind) => (
          <Component key={el.id} {...el} IDe={22} />
        ))}
      </div>
      <div className={styles.pagination} >
        <button onClick={() => { handlePage(-1) }} >-</button>
        <button disabled >{page}</button>
        <button onClick={() => { handlePage(1) }} >+</button>
      </div>
    </div>
  );
}

export default TvSeries;
