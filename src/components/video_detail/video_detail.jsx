import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import SaveVideo from '../save_video/save_video';
import styles from './video_detail.module.css';

const VideoDetail = ({
  selectedVideo: { video, channel },
  formatDate,
  formatNumber,
  videoRepository,
}) => {
  const [saveVideoOpen, setSaveVideoOpen] = useState(false);

  const toggleSaveVideo = () => {
    setSaveVideoOpen(!saveVideoOpen);
  };

  const closePopup = () => {
    setSaveVideoOpen(false);
  };

  return (
    <div className={styles.detail}>
      <div className={styles.videoBox}>
        <iframe
          className={styles.iframe}
          id={video.id}
          title={video.snippet.title}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.id}`}
          frameBorder="0"
        ></iframe>
      </div>
      <div className={styles.videoInfo}>
        <div className={styles.infoTop}>
          {video.snippet.tags &&
            video.snippet.tags.slice(0, 3).map(tag => (
              <span className={styles.tag} key={tag}>
                #{tag}
              </span>
            ))}
          <h3 className={styles.videoTitle}>{video.snippet.title}</h3>
          <div className={styles.videoPrimary}>
            <p className={styles.videoDetails}>
              {video.statistics && video.statistics.viewCount && (
                <span className={styles.viewCount}>
                  조회수{' '}
                  {Number(video.statistics.viewCount).toLocaleString('en-US')}회
                  •{' '}
                </span>
              )}
              <span className={styles.published}>
                {' '}
                {formatDate(video.snippet.publishedAt)}
              </span>
            </p>
            <div className={styles.rightBox}>
              {video.statistics && video.statistics.likeCount && (
                <div className={styles.like}>
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className={styles.thumbsUp}
                  />
                  <span className={styles.likeCount}>
                    {formatNumber(video.statistics.likeCount)}
                  </span>
                </div>
              )}
              {video.statistics && video.statistics.dislikeCount && (
                <div className={styles.dislike}>
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    className={styles.thumbsDown}
                  />
                  <span className={styles.dislikeCount}>
                    {formatNumber(video.statistics.dislikeCount)}
                  </span>
                </div>
              )}
              <button className={styles.saveVideoBtn} onClick={toggleSaveVideo}>
                <FontAwesomeIcon icon={faPlus} /> 저장
              </button>
              {saveVideoOpen && (
                <SaveVideo
                  videoId={video.id.videoId || video.id}
                  videoTitle={video.snippet.title}
                  channelId={video.snippet.channelId}
                  closePopup={closePopup}
                  videoRepository={videoRepository}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.infoDetails}>
          <div className={styles.channelBox}>
            <div className={styles.logoBox}>
              {channel && channel.snippet.thumbnails && (
                <img
                  className={styles.logo}
                  src={channel.snippet.thumbnails.default.url}
                  alt="channel logo"
                />
              )}
            </div>
            <div className={styles.channel}>
              <h4 className={styles.channel}>{video.snippet.channelTitle}</h4>
              {channel && channel.statistics.subscriberCount && (
                <p className={styles.subscriber}>
                  구독자 {formatNumber(channel.statistics.subscriberCount)}
                </p>
              )}
            </div>
          </div>
          <div className={styles.tags}>
            {video.snippet.tags &&
              video.snippet.tags.map(tag => (
                <span className={styles.tag} key={tag}>
                  #{tag}
                </span>
              ))}
          </div>
          <p className={styles.desc}>{video.snippet.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
