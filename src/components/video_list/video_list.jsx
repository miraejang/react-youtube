import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

const VideoList = ({ videos, page, listId = null }) => {
  const type = page => {
    switch (page) {
      case 'home':
        return `${styles.ul} ${styles.grid} ${styles.home}`;
      case 'watch':
        return `${styles.ul} ${styles.list} ${styles.watch}`;
      case 'results':
        return `${styles.ul} ${styles.list} ${styles.results}`;
      case 'history':
        return `${styles.ul} ${styles.list} ${styles.history}`;
      case 'playlist':
        return `${styles.ul} ${styles.list} ${styles.playlist}`;
      case 'library':
        return `${styles.ul} ${styles.grid} ${styles.library}`;
      default:
        return `${styles.ul}`;
    }
  };

  return (
    <ul className={type(page)}>
      {videos &&
        videos.map(videoData => (
          <VideoItem
            videoData={videoData}
            page={page}
            key={videoData.video.id.videoId || videoData.video.id}
            listId={listId}
          />
        ))}
    </ul>
  );
};

export default VideoList;
