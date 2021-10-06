import React from 'react';
import styles from './video_detail.module.css';

const VideoDetail = ({ selectedVideo }) => (
  <div className={styles.detail}>
    <div className={styles.videoBox}>
      <iframe
        className={styles.iframe}
        id={selectedVideo.id}
        title={selectedVideo.snippet.title}
        width="100%"
        height="100%"
        src={`http://www.youtube.com/embed/${selectedVideo.id}`}
        frameborder="0"
      ></iframe>
    </div>
    <div className={styles.videoInfo}>
      <h3 className={styles.videoTitle}>{selectedVideo.snippet.title}</h3>
      <p className={styles.published}>최초 공개 : {selectedVideo.snippet.publishedAt}</p>
    </div>
  </div>
);

export default VideoDetail;
