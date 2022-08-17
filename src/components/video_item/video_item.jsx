import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedVideo } from '../../store';
import styles from './video_item.module.css';

const VideoItem = ({
  youtube,
  videoId,
  channelId,
  formatDate,
  formatNumber,
  isGrid,
  videoRepository,
}) => {
  const dispatch = useDispatch();
  const [video, setvideo] = useState(null);
  const [channel, setChannel] = useState(null);
  const display = isGrid
    ? `${styles.item} ${styles.grid}`
    : `${styles.item} ${styles.list}`;
  const user = useSelector(state => state.user.data);
  const history = useSelector(state => state.history.data);

  useEffect(() => {
    youtube
      .getAllData(videoId, channelId) //
      .then(data => {
        setvideo(data[0]);
        setChannel(data[1]);
      });
  }, [youtube, videoId, channelId]);

  const clickVideo = () => {
    dispatch(setSelectedVideo({ video, channel }));
    if (user) {
      saveHistory();
    }
  };

  const saveHistory = () => {
    const date = new Date()
      .toLocaleDateString()
      .split(' ')
      .map(num => `${parseInt(num)}`.padStart(2, '0'))
      .join('');

    const todayHistory =
      (history &&
        history[date] &&
        history[date].filter(video => video.videoId !== videoId)) ||
      [];

    videoRepository.saveVideo(user.uid, [
      { videoId, channelId },
      ...todayHistory,
    ]);
  };

  return (
    <>
      {video && channel && (
        <li className={display} onClick={clickVideo}>
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
