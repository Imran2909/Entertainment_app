// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from "../pages/singleDetail.module.css"

// const ShowImages = (props) => {
//   const [images, setImages] = useState([]);
//   const [query, setQuery] = useState('');

//   const tmdbApiKey = '5ae304b91cd12d71e100db44c6812cb6';

//   useEffect(() => {
//     const handleSearch = async () => {
//       const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
//         params: {
//           api_key: tmdbApiKey,
//           query: props.title,
//         },
//       });
//       if (tmdbResponse.data.results.length === 0) {
//         console.error('No movie found');
//         setImages([]);
//         return;
//       }
//       const movieId = tmdbResponse.data.results[0].id;
//       const imagesResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
//         params: {
//           api_key: tmdbApiKey,
//         },
//       });
//       const movieImages = imagesResponse.data.backdrops.slice(0, 12)
//       setImages(movieImages);
//     };
//     handleSearch()
//   }, [])

//   return (
//     <div>
//       <div className={styles.allImg} >
//         {images && images.map((image, index) => (
//           <img
//             key={index}
//             src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
//             alt="Movie scene"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShowImages;




















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../pages/singleDetail.module.css";

const ShowImages = ({ title }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tmdbApiKey = '5ae304b91cd12d71e100db44c6812cb6';

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: tmdbApiKey,
            query: title,
          },
        });
        if (tmdbResponse.data.results.length === 0) {
          setError('No movie found');
          setLoading(false);
          return;
        }
        const movieId = tmdbResponse.data.results[0].id;
        const imagesResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
          params: {
            api_key: tmdbApiKey,
          },
        });
        const movieImages = imagesResponse.data.backdrops.slice(0, 12);
        setImages(movieImages);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch images');
        setLoading(false);
      }
    };
    handleSearch();
  }, [title]);

  if (loading) return <div className={styles.spinner}></div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div>
      <div className={styles.allImg}>
        {images && images.map((image, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
            alt="Movie scene"
          />
        ))}
      </div>
    </div>
  );
};

export default ShowImages;
