import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

const VideoList = ({
  youtube,
  videos,
  formatDate,
  formatNumber,
  isGrid,
  videoRepository,
  page,
}) => {
  const ulClassMaker = page => {
    switch (page) {
      case 'history':
        return `${styles.list} ${styles.history}`;
      default:
        return `${styles.list}`;
    }
  };
  const ulClass = ulClassMaker(page);

  return (
    <ul className={ulClass}>
      {videos &&
        videos.map(video => (
          <VideoItem
            youtube={youtube}
            videoId={video.videoId || video.id.videoId || video.id}
            channelId={video.channelId || video.snippet.channelId}
            formatDate={formatDate}
            formatNumber={formatNumber}
            isGrid={isGrid}
            key={video.videoTitle || video.snippet.title}
            videoRepository={videoRepository}
            page="history"
          />
        ))}
    </ul>
  );
};

export default VideoList;
