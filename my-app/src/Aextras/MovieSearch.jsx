import React, { useState } from 'react';
import axios from 'axios';

const MovieSearch = () => {
  const [trailer, setTrailer] = useState(null);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');

  // const apiKey = 'AIzaSyDNmveSYDSSKaKK6I1UmhRR8p8xdKK8BLo';
  // const tmdbApiKey = '5ae304b91cd12d71e100db44c6812cb6';

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value;
    setQuery(searchQuery);

    // Fetch trailer from YouTube API
    const youtubeResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: `${searchQuery} trailer`,
        type: 'video',
        key: apiKey,
      },
    });

    const trailerVideo = youtubeResponse.data.items[0];
    setTrailer(trailerVideo);

    // Fetch movie details from TMDb API
    const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: tmdbApiKey,
        query: searchQuery,
      },
    });

    if (tmdbResponse.data.results.length === 0) {
      console.error('No movie found');
      return;
    }

    const movieId = tmdbResponse.data.results[0].id;

    // Fetch images from TMDb API
    const imagesResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
      params: {
        api_key: tmdbApiKey,
      },
    });

    const movieImages = imagesResponse.data.backdrops.slice(0, 12); // Get 10-12 images
    setImages(movieImages);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search for a movie" />
        <button type="submit">Search</button>
      </form>
      {trailer && (
        <div>
          <h3>{trailer.snippet.title}</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.id.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={trailer.snippet.title}
          ></iframe>
        </div>
      )}
      <div>
        {images.map((image, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
            alt="Movie scene"
            style={{ width: '200px', height: 'auto', margin: '10px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
