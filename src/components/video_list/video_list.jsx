import React, { useEffect, useState } from 'react';
import { videosApi } from '../../api';
import VideoItem from '../video_item/video_item';

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
    <ul>
      {videos.map(video => (
        <VideoItem video={video} />
      ))}
    </ul>
  );
}

export default VideoList;
