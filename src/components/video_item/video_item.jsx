import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setSelectedVideo } from '../../store';
import VideoMenu from '../video_menu/video_menu';
import styles from './video_item.module.css';

const VideoItem = ({
  videoData,
  videoData: {
    video,
    channel,
    channel: { id: channelId },
  },
  page,
  listId,
}) => {
  const RESULTS = page === 'results';
  const HISTORY = page === 'history';
  const PLAYLIST = page === 'playlist';
  const videoId = video.id.videoId || video.id;
  const [hover, setHover] = useState(false);
  const user = useSelector(state => state.authService.user);
  const {
    repository: videoRepo,
    feeds: { history },
  } = useSelector(state => state.videoRepository);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // video menu variables
  const [videoMenuOpen, setVideoMenuOpen] = useState(false);
  const videoMenu = useSelector(state => state.videoMenu);
  // page type className
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

  // functions
  const clickVideo = () => {
    dispatch(setSelectedVideo(videoData));
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
        history[date].filter(videoData => videoData.video.id !== videoId)) ||
      [];

    videoRepo.saveVideo(user.uid, [videoData, ...todayHistory]);
  };

  const compCount = count => {
    const num = Number(count);
    if (num > 1000) {
      const tenT = num > 10000;
      const div = tenT ? num / 10000 : num / 1000;
      const compNum = div > 10 ? div.toFixed(0) : div.toFixed(1);
      const str = parseFloat(compNum).toLocaleString('en-IN');
      return tenT ? `${str}만회` : `${str}천회`;
    } else {
      return `${num}회`;
    }
  };

  // video menu functions
  useEffect(() => {
    if (videoMenu.listId === listId && videoMenu.videoId === videoId) {
      setVideoMenuOpen(true);
    } else {
      setVideoMenuOpen(false);
    }
  }, [videoMenu]);

  const hoverContainer = e => {
    if (e.type === 'mouseenter') setHover(true);
    if (e.type === 'mouseleave' && !videoMenuOpen) setHover(false);
  };

  const clearHover = () => {
    setHover(false);
  };

  // content
  const videoMenuContent = (
    <div className={styles.videoMenu}>
      {video && channel && (
        <VideoMenu
          videoId={videoId}
          thumbnail={video.snippet.thumbnails.medium.url}
          channelId={channelId}
          clearHover={clearHover}
          hover={hover}
          listId={listId}
          videoMenuOpen={videoMenuOpen}
        />
      )}
    </div>
  );

  return (
    <>
      {video && channel && (
        <li className={listType(page)} onClick={clickVideo}>
          <div
            className={`${styles.container} ${hover && styles.hover}`}
            onMouseEnter={hoverContainer}
            onMouseLeave={hoverContainer}
          >
            {PLAYLIST && (
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
                <div className={styles.title}>
                  <h4>{video.snippet.title}</h4>
                </div>
                <div className={styles.meta}>
                  <div className={styles.channel}>
                    <div className={styles.logo}>
                      <div className={styles.logoImg}>
                        <img
                          src={channel.snippet.thumbnails.default.url}
                          alt="channel logo"
                        />
                      </div>
                    </div>
                    <div className={styles.channelTitle}>
                      {video.snippet.channelTitle}
                    </div>
                  </div>
                  {video.statistics && (
                    <p className={styles.popularity}>
                      <span>
                        조회수 {compCount(video.statistics.viewCount)}
                      </span>
                      <span> • </span>
                      <span>
                        {new Date(video.snippet.publishedAt) //
                          .toLocaleDateString('ko-KR')}
                      </span>
                    </p>
                  )}
                  {/* {(RESULTS || HISTORY) && (
                    <p className={styles.desc}>{video.snippet.description}</p>
                  )} */}
                </div>
                {!PLAYLIST && videoMenuContent}
              </div>
            </Link>
            {PLAYLIST && videoMenuContent}
          </div>
        </li>
      )}
    </>
  );
};

export default VideoItem;
