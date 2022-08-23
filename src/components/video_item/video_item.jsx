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
  page,
  videoRepository,
}) => {
  const dispatch = useDispatch();
  const [video, setvideo] = useState(null);
  const [channel, setChannel] = useState(null);
  const user = useSelector(state => state.user.data);
  const history = useSelector(state => state.userFeeds.history);
  const listType = page => {
    switch (page) {
      case 'home':
        return `${styles.item} ${styles.grid} ${styles.home}`;
      case 'watch':
        return `${styles.item} ${styles.list} ${styles.watch}`;
      case 'results':
        return `${styles.item} ${styles.list} ${styles.results}`;
      case 'history':
        return `${styles.item} ${styles.list} ${styles.history}`;
      case 'playlist':
        return `${styles.item} ${styles.list} ${styles.playlist}`;
      case 'library':
        return `${styles.item} ${styles.grid} ${styles.library}`;
      default:
        return `${styles.item} ${styles.list}`;
    }
  };

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
        <li className={listType(page)} onClick={clickVideo}>
          {page === 'playlist' && (
            <div className={styles.grip}>
              <div className={styles.icon}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
              </div>
            </div>
          )}
          <Link className={styles.link} to={`/watch/${videoId}`}>
            <div className={styles.thumbnail}>
              <div className={styles.viewBox}>
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={`${video.snippet.title} thumbnail`}
                />
              </div>
            </div>
            <div className={styles.videoInfo}>
              <div className={styles.logo}>
                <div className={styles.logoImg}>
                  <img
                    src={channel.snippet.thumbnails.default.url}
                    alt="channel logo"
                  />
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.title}>
                  <h4>{video.snippet.title}</h4>
                </div>
                <div className={styles.meta}>
                  <p className={styles.channel}>{video.snippet.channelTitle}</p>
                  {video.snippet && video.statistics && (
                    <p className={styles.popularity}>
                      <span>
                        조회수 {formatNumber(video.statistics.viewCount)}
                      </span>
                      <span> • </span>
                      <span>{formatDate(video.snippet.publishedAt)}</span>
                    </p>
                  )}
                </div>
              </div>
              {page !== 'playlist' && (
                <div className={styles.menu}>
                  <FontAwesomeIcon icon={faEllipsisV} className={styles.icon} />
                </div>
              )}
            </div>
          </Link>
          {page === 'playlist' && (
            <div className={styles.menu}>
              <FontAwesomeIcon icon={faEllipsisV} className={styles.icon} />
            </div>
          )}
        </li>
      )}
    </>
  );
};

export default VideoItem;
