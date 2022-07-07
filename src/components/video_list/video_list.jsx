import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

const VideoList = ({ youtube, videos, videoClick, selectedVideo }) => (
  <ul className={styles.list}>
    {videos &&
      videos.map((video, idx) => (
        <VideoItem
          youtube={youtube}
          video={video}
          videoClick={videoClick}
          selectedVideo={selectedVideo}
          key={`${video.id}${idx}`}
        />
      ))}
  </ul>
);

export default VideoList;
