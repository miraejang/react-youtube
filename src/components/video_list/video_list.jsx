import React, { useEffect, useState } from 'react';
import { videosApi } from '../../api';

function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const popular = await videosApi.mostPopular();
      setVideos(popular.data.items);
    }

    fetchData();
  }, []);

  return (
    <div>
      {videos.map(video => (
        <p>{video.snippet.title}</p>
      ))}
    </div>
  );
}

export default VideoList;
