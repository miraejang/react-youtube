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
  return (
    <ul className={styles.list}>
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
