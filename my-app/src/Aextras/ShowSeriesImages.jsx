import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowSeriesImages = (props) => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');

  const tmdbApiKey = '5ae304b91cd12d71e100db44c6812cb6';

  useEffect(() => {
    const handleSearch = async () => {
      const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/search/tv`, {
        params: {
          api_key: tmdbApiKey,
          query: props.title,
        },
      });
      if (tmdbResponse.data.results.length === 0) {
        console.error('No movie found');
        setImages([]);
        return;
      }
      const movieId = tmdbResponse.data.results[0].id;
      const imagesResponse = await axios.get(`https://api.themoviedb.org/3/tv/${movieId}/images`, {
        params: {
          api_key: tmdbApiKey,
        },
      });
      const movieImages = imagesResponse.data.backdrops.slice(0, 12)
      setImages(movieImages);
    };
    handleSearch()
  }, [])

  return (
    <div>
      <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"40px" }} >
        {images && images?.length > 1 ?
          images.map((image, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              alt="Movie scene"
              style={{ width: '100%', height: 'auto', borderRadius:"10px" }}
            />
          )) : <h2>No screenshots available for this tv series </h2>
        }
      </div>
    </div>
  );
};

export default ShowSeriesImages;
