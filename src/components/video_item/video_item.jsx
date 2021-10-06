import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './video_item.module.css';

const VideoItem = ({ video, video: { snippet }, videoClick, selectedVideo }) => {
  const display = selectedVideo ? styles.list : styles.grid;
  return (
    <li className={display} onClick={() => videoClick(video)}>
      <div className={styles.imgBox}>
        <div className={styles.imgViewBox}>
          <img className={styles.img} src={snippet.thumbnails.high.url} alt={`${snippet.title} thumbnail`} />
        </div>
      </div>
      <div className={styles.detailsBox}>
        <div className={styles.logoBox}>
          <div className={styles.logo}></div>
        </div>
        <div className={styles.infoBox}>
          <h4 className={styles.title}>{snippet.title}</h4>
          <p className={styles.channel}>{snippet.channelTitle}</p>
        </div>
        <div className={styles.menuBox}>
          <FontAwesomeIcon icon={faEllipsisV} className={styles.iconMenu} />
        </div>
      </div>
    </li>
  );
};

export default VideoItem;
