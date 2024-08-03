import React, { useState, useEffect } from "react";
import styles from "./movies.module.css";
import Navbar from "../components/Navbar";
import Component from "../components/Component";
import { useDispatch, useSelector } from "react-redux";
import { requestAction, requestTvSeriesDataFetch } from "../redux/action";

function TvSeries() {
  const loading = useSelector((store) => store.isLoading);
  const error = useSelector((store) => store.isError);
  const data = useSelector((store) => store.tvSeries);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm === "") {
      // Fetch on-the-air TV series if there's no search term
      dispatch(requestAction());
      dispatch(
        requestTvSeriesDataFetch(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=5ae304b91cd12d71e100db44c6812cb6&language=en-US&page=${page}`
        )
      );
    } else {
      // Fetch search results if there's a search term
      dispatch(requestAction());
      dispatch(
        requestTvSeriesDataFetch(
          `https://api.themoviedb.org/3/search/tv?api_key=5ae304b91cd12d71e100db44c6812cb6&language=en-US&query=${searchTerm}&page=${page}`
        )
      );
    }
  }, [dispatch, page, searchTerm]); // Include searchTerm in dependency array

  const handlePage = (val) => {
    setPage(page + val);
  };

  // Handle search term change
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setPage(1); // Reset to the first page when searching
  };

  return (
    <div className={styles.box}>
      <div className={styles.navbar}>
        <Navbar text="TV series" onSearchChange={handleSearchChange} />
      </div>
      <div className={styles.heading}>Tv Series</div>
      <div className={styles.container}>
        {loading ? (
          <div className={styles.spinner}></div>
        ) : error ? (
          <h1>Something went wrong</h1>
        ) : (
          data &&
          data.map((el, ind) => <Component key={el.id} {...el} IDe={111} />)
        )}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => handlePage(-1)} disabled={page === 1}>
          {" "}
          <b>&lt;</b>{" "}
        </button>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button disabled>{page}</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => handlePage(1)}>
          {" "}
          <b>&gt;</b>{" "}
        </button>
      </div>
    </div>
  );
}

export default TvSeries;
