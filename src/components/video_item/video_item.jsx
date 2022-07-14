import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './video_item.module.css';

const VideoItem = ({
  youtube,
  videoId,
  channelId,
  clickVideo,
  formatDate,
  formatNumber,
  selectedVideo,
}) => {
  const [video, setvideo] = useState(null);
  const [channel, setChannel] = useState(null);
  const display = selectedVideo ? styles.list : styles.grid;

  useEffect(() => {
    youtube
      .getAllData(videoId, channelId) //
      .then(data => {
        setvideo(data[0]);
        setChannel(data[1]);
      });
  }, [youtube, videoId, channelId]);

  return (
    <>
      {video && channel && (
        <li className={display} onClick={() => clickVideo(videoId, channelId)}>
          <Link to={`/watch/${videoId}`}>
            <div className={styles.imgBox}>
              <div className={styles.imgViewBox}>
                <img
                  className={styles.img}
                  src={video.snippet.thumbnails.high.url}
                  alt={`${video.snippet.title} thumbnail`}
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
                <h4 className={styles.title}>{video.snippet.title}</h4>
                <p className={styles.channel}>{video.snippet.channelTitle}</p>
                {video.snippet && video.statistics && (
                  <p className={styles.channel}>
                    <span>
                      조회수 {formatNumber(video.statistics.viewCount)} •{' '}
                    </span>
                    <span>{formatDate(video.snippet.publishedAt)}</span>
                  </p>
                )}
              </div>
              <div className={styles.menuBox}>
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  className={styles.iconMenu}
                />
              </div>
            </div>
          </Link>
        </li>
      )}
    </>
  );
};

export default VideoItem;
