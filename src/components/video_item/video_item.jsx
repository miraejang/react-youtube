import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styles from './video_item.module.css';

const VideoItem = ({
  youtube,
  video,
  video: { snippet },
  videoClick,
  selectedVideo,
}) => {
  const [channel, setChannel] = useState(null);
  const display = selectedVideo ? styles.list : styles.grid;

  useEffect(() => {
    youtube.getChannel(snippet.channelId).then(data => setChannel(data));
  }, [youtube, snippet]);

  return (
    <>
      {channel && (
        <li className={display} onClick={() => videoClick(video)}>
          <div className={styles.imgBox}>
            <div className={styles.imgViewBox}>
              <img
                className={styles.img}
                src={snippet.thumbnails.high.url}
                alt={`${snippet.title} thumbnail`}
              />
            </div>
          </div>
          <div className={styles.detailsBox}>
            <div className={styles.logoBox}>
              <div className={styles.logo}>
                <img
                  className={styles.logoImage}
                  src={channel.snippet.thumbnails.default.url}
                  alt="channel logo"
                />
              </div>
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
      )}
    </>
  );
};

export default VideoItem;
