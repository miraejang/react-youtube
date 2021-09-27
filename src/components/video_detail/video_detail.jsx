import React from 'react';
import styles from './video_detail.module.css';

function VideoDetail({ selectedVideo }) {
  return <div className={styles.detail}>{selectedVideo}</div>;
}

export default VideoDetail;
