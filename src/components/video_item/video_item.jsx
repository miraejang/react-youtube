import React from 'react';
import styles from './video_item.module.css';

function VideoItem({ video, video: { snippet }, videoClick, selectedVideo }) {
  const itemType = selectedVideo ? styles.detailItem : styles.mainItem;
  return (
    <li className={itemType} key={video.id} onClick={() => videoClick(video)}>
      <div className={styles.imgBox}>
        <img className={styles.img} src={snippet.thumbnails.high.url} alt={`${snippet.title} thumbnail`} />
      </div>
      <div className={styles.infoBox}>
        <h4 className={styles.title}>{snippet.title}</h4>
        <p className={styles.channel}>{snippet.channelTitle}</p>
      </div>
    </li>
  );
}

export default VideoItem;
