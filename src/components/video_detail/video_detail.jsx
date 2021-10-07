import React from 'react';
import styles from './video_detail.module.css';

const VideoDetail = ({ selectedVideo }) => {
  console.log(selectedVideo);
  return (
    <div className={styles.detail}>
      <div className={styles.videoBox}>
        <iframe
          className={styles.iframe}
          id={selectedVideo.id}
          title={selectedVideo.snippet.title}
          width="100%"
          height="100%"
          src={`http://www.youtube.com/embed/${selectedVideo.id}`}
          frameBorder="0"
        ></iframe>
      </div>
      <div className={styles.videoInfo}>
        <div className={styles.infoTop}>
          {selectedVideo.snippet.tags &&
            selectedVideo.snippet.tags.slice(0, 3).map(tag => (
              <span className={styles.tag} key={tag}>
                #{tag}
              </span>
            ))}
          <h3 className={styles.videoTitle}>{selectedVideo.snippet.title}</h3>
          <p className={styles.published}>최초 공개 : {selectedVideo.snippet.publishedAt}</p>
        </div>
        <div className={styles.infoDetails}>
          <h4 className={styles.channel}>{selectedVideo.snippet.channelTitle}</h4>
          <div className={styles.tags}>
            {selectedVideo.snippet.tags &&
              selectedVideo.snippet.tags.map(tag => (
                <span className={styles.tag} key={tag}>
                  #{tag}
                </span>
              ))}
          </div>
          <p className={styles.desc}>{selectedVideo.snippet.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
