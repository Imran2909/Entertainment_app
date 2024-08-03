import React, { useEffect, useState } from 'react';
import styles from "./singleDetail.module.css";
import { useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import YouTubeSearch from '../Aextras/YouTubeSearch';
import ShowImages from '../Aextras/ShowImages';
import { useDispatch, useSelector } from 'react-redux';
import { requestAction, requestSingleMovieDataFetch } from '../redux/action';

function SingleDetail() {
  const { id } = useParams();
  const loading = useSelector((store) => store.isLoading);
  const error = useSelector((store) => store.isError);
  const movie = useSelector((store) => store.singleMovie);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAction());
    dispatch(requestSingleMovieDataFetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5ae304b91cd12d71e100db44c6812cb6`));
  }, [dispatch, id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles['josefin-sans']}>
      {loading ? (
        <div className={styles.outer} >
          <div className={styles.spinner}></div>
        </div>
      ) : error ? (
        <div className={styles.outer} >
          <h1>Something went wrong</h1>
          <h1>Unable to fetch data, please refresh once</h1>
        </div>
      ) : movie ? (
        <div className={styles.main}>
          <div className={styles.top}>
            <div className={styles.img}>
              <img className={styles.poster} src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
              <div className={styles.links}>
                <div>
                  <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className={styles.website}>Visit Website</a>
                  <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">Show IMDB</a>
                </div>
                <div>
                  <button onClick={handleOpenModal} className={styles.trailer}>View Trailer</button>
                </div>
              </div>
            </div>

            <div className={styles.details}>
              <div className={styles.title}>{movie.title}</div>
              <div className={styles.genres}>
                {movie.genres && movie.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
              <div className={styles.rating}>
                <div className={styles.mth}>
                  Rating:
                </div>
                <span>⭐️⭐️⭐️⭐️☆</span> <span> ({movie.vote_count} votes)</span>
              </div>
              <div className={styles.synopsis}>
                <div className={styles.mth}>
                  Synopsis:
                </div>
                <p>{movie.overview}</p>
              </div>
              <div className={styles.metadata}>
                <p>
                  <div className={styles.mth}>
                    Length:
                  </div>
                  {movie.runtime} min.
                </p>
                <p>
                  <div className={styles.mth}>
                    Language:
                  </div>
                  {movie.original_language}
                </p>
                <p>
                  <div className={styles.mth}>
                    Year:
                  </div>
                  {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                </p>
                <p>
                  <div className={styles.mth}>
                    Status:
                  </div>
                  {movie.status}
                </p>
              </div>
              <div className={styles.producers}>
                <div className={styles.mth}>
                  Produced by:
                </div>
                <div className={styles.prods}>
                  {movie.production_companies && movie.production_companies.map((el) => (
                    <div key={el.id} className={styles.comp}>
                      <img src={`https://image.tmdb.org/t/p/w300${el.logo_path}`} className={styles.prodImg} alt={el.name} />
                      <p>{el.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.showImages}>
            <div className={styles.screenShotTitle}>
              Screenshots from movie
            </div>
            <div className={styles.screenShots}>
              <ShowImages title={movie.title} />
            </div>
          </div>

          <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
            <YouTubeSearch query={movie.title} />
          </Modal>
        </div>
      ) : null}
    </div>
  );
}

export default SingleDetail;
