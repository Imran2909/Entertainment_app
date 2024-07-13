import React, { useEffect, useState } from 'react';
import styles from "./singleDetail.module.css";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios'
import ShowImages from '../Aextras/ShowImages';
import YouTubeSearch from '../Aextras/YouTubeSearch';
import ShowSeriesImages from '../Aextras/ShowSeriesImages';

function SingleDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null)
  // const movies = useSelector((state) => state.movies); // Assuming you have a movies slice in your Redux store
  // const movie = movies.find((movie) => movie.id === parseInt(id));

  // console.log("movie", movie);
  useEffect(() => {
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


  return (
    <div className={styles['josefin-sans']}>
      {
        movie && movie ? <div className={styles.main}>
          <div className={styles.top} >
            <div className={styles.img} >
              <img className={styles.poster} src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
              <div className={styles.links}>
                <div>
                  <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className={styles.website} >Visit Website   </a>
                  <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">Show IMDB
                  </a>
                </div>
                <div>
                  <a href=""> View Trailer </a>
                </div>
              </div>
            </div>

            <div className={styles.details}>
              <div className={styles.title}>{movie.title}</div>
              <div className={styles.genres}>
                {movie.genres && movie.genres?.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
              <div className={styles.rating}>
                <div className={styles.mth} >
                  Rating:
                </div>
                <span>⭐️⭐️⭐️⭐️☆</span>  <span> ( {movie.vote_count} votes)</span>
              </div>
              <div className={styles.synopsis}>
                <div className={styles.mth} >
                  Synopsis:
                </div>
                <p>{movie.overview}</p>
              </div>
              <div className={styles.metadata}>
                <p>
                  <div className={styles.mth} >
                    Length:
                  </div>
                  {movie.runtime} min.</p>
                <p>
                  <div className={styles.mth} >
                    Language:
                  </div>
                  {movie.original_language}</p>
                <p>
                  <div className={styles.mth} >
                    Year:
                  </div>
                  {movie.release_date.split('-')[0]}</p>
                <p>
                  <div className={styles.mth} >
                    Status:
                  </div>
                  {movie.status}</p>
              </div>
              <div className={styles.producers} >
                <div className={styles.mth} >
                  Produced by:
                </div>
                <div className={styles.prods} >
                  {
                    movie && movie.production_companies && movie.production_companies.map((el, ind) => {
                      return (
                        <div className={styles.comp} >
                          <img key={el.id} src={`https://image.tmdb.org/t/p/w300${el.logo_path}`} className={styles.prodImg} alt="" />
                          <p> {el.name} </p>
                        </div>
                      )
                    })
                  }
                  {/* <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="" /> */}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.showImages} >
            <div className={styles.screenShotTitle} >
              Screenshots from movie
            </div>
            <div className={styles.screenShots} >
              {
                movie && movie.title ? <ShowImages title={movie.title}  /> : <ShowSeriesImages title={movie.title} />
              }
            </div>

          </div>
        </div> : "Loading...................."
      }
    </div>
  )
}

export default SingleDetail;
