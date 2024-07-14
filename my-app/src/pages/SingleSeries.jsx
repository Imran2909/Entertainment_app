// import React, { useEffect, useState } from 'react';
// import styles from "./singleSeries.module.css";
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import axios from 'axios'
// import ShowImages from '../Aextras/ShowImages';
// import YouTubeSearch from '../Aextras/YouTubeSearch';
// import ShowSeriesImages from '../Aextras/ShowSeriesImages';

// function SingleSeries() {
//   const { id } = useParams();
//   const [series, setSeries] = useState(null)

//   // console.log("SERIES",series);
//   useEffect(() => {
//     async function fetchMovieDetails(movieId) {
//       try {
//         const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=5ae304b91cd12d71e100db44c6812cb6`);
//         console.log("SERIES", response.data);
//         setSeries(response.data)
//         return response.data;
//       } catch (error) {
//         console.error('Error fetching movie details:', error);
//         return null;
//       }
//     }
//     fetchMovieDetails(id)
//   }, [])





//   return (
//     <div>
//       <div className={styles['josefin-sans']}>
//         {
//           series && series ? <div className={styles.main}>
//             <div className={styles.top} >
//               <div className={styles.img} >
//                 <img className={styles.poster} src={`https://image.tmdb.org/t/p/w300${series.poster_path}`} alt={"No image avl."} />
//                 <div className={styles.links}>
//                   <div>
//                     <a href={series.homepage} target="_blank" rel="noopener noreferrer" className={styles.website} >Visit Website   </a>
//                     <a href={`https://www.imdb.com/title/${series.imdb_id}`} target="_blank" rel="noopener noreferrer">Show IMDB
//                     </a>
//                   </div>
//                   <div>
//                     <a href=""> View Trailer </a>
//                   </div>
//                 </div>
//               </div>

//               <div className={styles.details}>
//                 <div className={styles.title}>{series.name}</div>
//                 <div className={styles.genres}>
//                   {series.genres && series.genres?.map((genre) => (
//                     <span key={genre.id}>{genre.name}</span>
//                   ))}
//                 </div>
//                 <div className={styles.rating}>
//                   <div className={styles.mth} >
//                     Rating:
//                   </div>
//                   <span>⭐️⭐️⭐️⭐️☆</span>  <span> ( {series.vote_count} votes)</span>
//                 </div>
//                 <div className={styles.synopsis}>
//                   <div className={styles.mth} >
//                     Synopsis:
//                   </div>
//                   <p>{
//                     series.overview ? series.overview : series.original_name
//                   }</p>
//                 </div>
//                 <div className={styles.metadata}>
//                   <p>
//                     <div className={styles.mth} >
//                       No. of episodes:
//                     </div>
//                     {series.number_of_episodes} </p>
//                   <p>
//                     <div className={styles.mth} >
//                       Language:
//                     </div>
//                     {series.original_language}</p>
//                   <p>
//                     <div className={styles.mth} >
//                       Year:
//                     </div>
//                     {series.first_air_date.split('-')[0]}</p>
//                   <p>
//                     <div className={styles.mth} >
//                       Status:
//                     </div>
//                     {series.status}</p>
//                 </div>
//                 <div className={styles.producers} >
//                   <div className={styles.mth} >
//                     Produced by:
//                   </div>
//                   <div className={styles.prods} >
//                     {
//                       series && series.production_companies && series.production_companies.map((el, ind) => {
//                         return (
//                           <div className={styles.comp} >
//                             <img key={el.id} src={`https://image.tmdb.org/t/p/w300${el.logo_path}`} className={styles.prodImg} alt="" />
//                             <p> {el.name} </p>
//                           </div>
//                         )
//                       })
//                     }
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className={styles.showImages} >
//               <div className={styles.screenShotTitle} >
//                 Screenshots from series
//               </div>
//               <div className={styles.screenShots} >
//                 {
//                   series && series.name ? <ShowSeriesImages title={series.name} /> : <ShowImages title={series.name} />
//                 }
//               </div>

//             </div>
//           </div> : "Loading...................."
//         }
//       </div>
//     </div>
//   )
// }

// export default SingleSeries;



import React, { useEffect, useState } from 'react';
import styles from "./singleSeries.module.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ShowImages from '../Aextras/ShowImages';
import YouTubeSearch from '../Aextras/YouTubeSearch';
import ShowSeriesImages from '../Aextras/ShowSeriesImages';
import Modal from '../components/Modal';

function SingleSeries() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerQuery, setTrailerQuery] = useState('');

  useEffect(() => {
    async function fetchSeriesDetails(seriesId) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=5ae304b91cd12d71e100db44c6812cb6`);
        console.log("SERIES", response.data);
        setSeries(response.data);
      } catch (error) {
        console.error('Error fetching series details:', error);
      }
    }
    fetchSeriesDetails(id);
  }, [id]);

  const openModal = (query) => {
    setTrailerQuery(query);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrailerQuery('');
  };

  return (
    <div>
      <div className={styles['josefin-sans']}>
        {series ? (
          <div className={styles.main}>
            <div className={styles.top}>
              <div className={styles.img}>
                <img className={styles.poster} src={`https://image.tmdb.org/t/p/w300${series.poster_path}`} alt={"No image avl."} />
                <div className={styles.links}>
                  <div>
                    <a href={series.homepage} target="_blank" rel="noopener noreferrer" className={styles.website}>Visit Website</a>
                    <a href={`https://www.imdb.com/title/${series.imdb_id}`} target="_blank" rel="noopener noreferrer">Show IMDB</a>
                  </div>
                  <div>
                    <a href="#" onClick={() => openModal(series.name)}>View Trailer</a>
                  </div>
                </div>
              </div>

              <div className={styles.details}>
                <div className={styles.title}>{series.name}</div>
                <div className={styles.genres}>
                  {series.genres && series.genres.map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </div>
                <div className={styles.rating}>
                  <div className={styles.mth}>Rating:</div>
                  <span>⭐️⭐️⭐️⭐️☆</span> <span>({series.vote_count} votes)</span>
                </div>
                <div className={styles.synopsis}>
                  <div className={styles.mth}>Synopsis:</div>
                  <p>{series.overview ? series.overview : series.original_name}</p>
                </div>
                <div className={styles.metadata}>
                  <p>
                    <div className={styles.mth}>No. of episodes:</div>
                    {series.number_of_episodes}
                  </p>
                  <p>
                    <div className={styles.mth}>Language:</div>
                    {series.original_language}
                  </p>
                  <p>
                    <div className={styles.mth}>Year:</div>
                    {series.first_air_date.split('-')[0]}
                  </p>
                  <p>
                    <div className={styles.mth}>Status:</div>
                    {series.status}
                  </p>
                </div>
                <div className={styles.producers}>
                  <div className={styles.mth}>Produced by:</div>
                  <div className={styles.prods}>
                    {series.production_companies && series.production_companies.map((el) => (
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
              <div className={styles.screenShotTitle}>Screenshots from series</div>
              <div className={styles.screenShots}>
                {series.name ? <ShowSeriesImages title={series.name} /> : <ShowImages title={series.name} />}
              </div>
            </div>
          </div>
        ) : (
          "Loading..."
        )}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <YouTubeSearch query={trailerQuery} />
      </Modal>
    </div>
  );
}

export default SingleSeries;