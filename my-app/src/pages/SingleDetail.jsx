import React, { useEffect, useState } from 'react';
import styles from "./singleDetail.module.css";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios'

function SingleDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null)
  // const movies = useSelector((state) => state.movies); // Assuming you have a movies slice in your Redux store
  // const movie = movies.find((movie) => movie.id === parseInt(id));

  useEffect(() => {
    console.log(id);
    async function fetchMovieDetails(movieId) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=5ae304b91cd12d71e100db44c6812cb6`);
        console.log(response.data);
        setMovie(response.data)
        return response.data;
      } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
      }
    }
    fetchMovieDetails(id)
  }, [])

  // if (!movie) {
  //   return <div>Movie not found</div>;
  // }



  return (
    <div>
      {
        movie && movie ? <div className={styles.main}>
          <img className={styles.poster} src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
          <div className={styles.details}>
            <div className={styles.title}>{movie.title}</div>
            <div className={styles.rating}>
              <span>{movie.vote_average}</span>
              <span>⭐️⭐️⭐️⭐️☆</span>
            </div>
            <div className={styles.metadata}>
              <div>Length: {movie.runtime} min.</div>
              <div>Language: {movie.original_language}</div>
              <div>Year: {movie.release_date.split('-')[0]}</div>
              <div>Status: {movie.status}</div>
            </div>
            <div className={styles.genres}>
              {movie.genres && movie.genres?.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>
            <div className={styles.synopsis}>
              <p>{movie.overview}</p>
            </div>
            <div className={styles.casts}>
              {movie.casts && movie.casts.map((cast) => (
                <span key={cast.id}>{cast.name}</span>
              ))}
            </div>
            <div className={styles.links}>
              <a href={movie.homepage} target="_blank" rel="noopener noreferrer">Website</a>
              <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">IMDB</a>
            </div>
          </div>
        </div> : "Loading...................."
      }
    </div>
  )
}

export default SingleDetail;
