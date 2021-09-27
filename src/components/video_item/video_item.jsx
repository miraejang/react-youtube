import React from 'react';
import styles from './video_item.module.css';

function VideoItem({ video, video: { snippet }, videoClick }) {
  return (
    <li className={styles.item} key={video.id} onClick={() => videoClick(video)}>
      <img className={styles.img} src={snippet.thumbnails.high.url} alt={`${snippet.title} thumbnail`} />
      <h4 className={styles.title}>{snippet.title}</h4>
      <p className={styles.channel}>{snippet.channelTitle}</p>
    </li>
  );
}

export default VideoItem;
