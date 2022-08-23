import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

const VideoList = ({
  youtube,
  videos,
  formatDate,
  formatNumber,
  page,
  videoRepository,
}) => {
  const type = page => {
    switch (page) {
      case 'home':
        return `${styles.list} ${styles.home}`;
      case 'watch':
        return `${styles.list} ${styles.watch}`;
      case 'results':
        return `${styles.list} ${styles.results}`;
      case 'history':
        return `${styles.list} ${styles.history}`;
      case 'playlist':
        return `${styles.list} ${styles.playlist}`;
      case 'library':
        return `${styles.list} ${styles.library}`;
      default:
        return `${styles.list}`;
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
            formatDate={formatDate}
            formatNumber={formatNumber}
            page={page}
            key={video.videoId || video.id.videoId || video.id}
            videoRepository={videoRepository}
          />
        ))}
    </ul>
  );
};

export default VideoList;
