import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './youtube.module.css';

const YouTubeSearch = ({ query }) => {
  const [video, setVideo] = useState(null);
  const apiKey = 'AIzaSyDNmveSYDSSKaKK6I1UmhRR8p8xdKK8BLo'; // Replace with your API key

  useEffect(() => {
    if (query) {
      const fetchVideo = async () => {
        try {
          const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
              part: 'snippet',
              q: query,
              type: 'video',
              maxResults: 1,
              key: apiKey,
            },
          });
          if (response.data.items.length > 0) {
            setVideo(response.data.items[0]);
          } else {
            console.error('No videos found');
          }
        } catch (error) {
          console.error('Error fetching data from YouTube API', error);
        }
      };

      fetchVideo();
    }
  }, [query]);

  return (
    <div className={styles.body}>
      {video ? (
        <div className={styles.cont}>
          <iframe
            className={styles.frame}
            src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.snippet.title}
          ></iframe>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default YouTubeSearch;
