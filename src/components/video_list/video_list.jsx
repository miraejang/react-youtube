import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

const VideoList = ({
  youtube,
  videos,
  videoClick,
  formatDate,
  formatNumber,
  selectedVideo,
}) => (
  <ul className={styles.list}>
    {videos &&
      videos.map(video => (
        <VideoItem
          youtube={youtube}
          videoId={video.id.videoId || video.id}
          channelId={video.snippet.channelId}
          videoClick={videoClick}
          formatDate={formatDate}
          formatNumber={formatNumber}
          selectedVideo={selectedVideo}
          key={video.snippet.title}
        />
      ))}
  </ul>
);

export default VideoList;
