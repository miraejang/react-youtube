import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

const VideoList = ({
  youtube,
  videos,
  page,
  videoRepository,
  listId = null,
}) => {
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
        videos.map(video => (
          <VideoItem
            youtube={youtube}
            videoId={video.videoId || video.id.videoId || video.id}
            channelId={video.channelId || video.snippet.channelId}
            page={page}
            key={video.videoId || video.id.videoId || video.id}
            videoRepository={videoRepository}
            listId={listId}
          />
        ))}
    </ul>
  );
};

export default VideoList;
