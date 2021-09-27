import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

function VideoList({ videos, videoClick, selectedVideo }) {
  return (
    <ul className={styles.list}>
      {videos && videos.map(video => <VideoItem video={video} videoClick={videoClick} selectedVideo={selectedVideo} />)}
    </ul>
  );
}

export default VideoList;
