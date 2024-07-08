import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YouTubeSearch = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState(''); // Initial search query
  // const apiKey = 'AIzaSyDNmveSYDSSKaKK6I1UmhRR8p8xdKK8BLo';

  useEffect(() => {
    if (query) {
      const fetchVideos = async () => {
        try {
          const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
              part: 'snippet',
              q: query,
              type: 'video',
              key: apiKey,
            },
          });
          setVideos(response.data.items);
        } catch (error) {
          console.error('Error fetching data from YouTube API', error);
        }
      };

      fetchVideos();
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.search.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search YouTube" />
        <button type="submit">Search</button>
      </form>
      <div>
        {videos.map((video) => (
          <div key={video.id.videoId}>
            <h3>{video.snippet.title}</h3>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.snippet.title}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeSearch;
