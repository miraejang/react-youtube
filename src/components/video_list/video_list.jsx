import React, { useEffect, useState } from 'react';
import { videosApi } from '../../api';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

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
    <ul className={styles.list}>
      {videos.map(video => (
        <VideoItem video={video} />
      ))}
    </ul>
  );
}

export default VideoList;
