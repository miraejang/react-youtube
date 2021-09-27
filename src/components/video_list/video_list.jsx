import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

function VideoList({ videos, videoClick }) {
  return (
    <ul className={styles.list}>
      {videos && videos.map(video => <VideoItem video={video} videoClick={videoClick} />)}
    </ul>
  );
}

export default VideoList;
