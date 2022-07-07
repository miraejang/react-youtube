import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './video_detail.module.css';

const VideoDetail = ({
  selectedVideo,
  channelInfo,
  formatDate,
  formatNumber,
}) => {
  return (
    <div className={styles.detail}>
      <div className={styles.videoBox}>
        <iframe
          className={styles.iframe}
          id={selectedVideo.id}
          title={selectedVideo.snippet.title}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${selectedVideo.id}`}
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
          <div className={styles.videoPrimary}>
            <p className={styles.videoDetails}>
              {selectedVideo.statistics &&
                selectedVideo.statistics.viewCount && (
                  <span className={styles.viewCount}>
                    조회수{' '}
                    {Number(selectedVideo.statistics.viewCount).toLocaleString(
                      'en-US'
                    )}
                    회 •{' '}
                  </span>
                )}
              <span className={styles.published}>
                {' '}
                {formatDate(selectedVideo.snippet.publishedAt)}
              </span>
            </p>
            <div className={styles.rightBox}>
              {selectedVideo.statistics && selectedVideo.statistics.likeCount && (
                <div className={styles.like}>
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className={styles.thumbsUp}
                  />
                  <span className={styles.likeCount}>
                    {formatNumber(selectedVideo.statistics.likeCount)}
                  </span>
                </div>
              )}
              {selectedVideo.statistics &&
                selectedVideo.statistics.dislikeCount && (
                  <div className={styles.dislike}>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className={styles.thumbsDown}
                    />
                    <span className={styles.dislikeCount}>
                      {formatNumber(selectedVideo.statistics.dislikeCount)}
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className={styles.infoDetails}>
          <div className={styles.channelBox}>
            <div className={styles.logoBox}>
              {channelInfo && channelInfo.snippet.thumbnails && (
                <img
                  className={styles.logo}
                  src={channelInfo.snippet.thumbnails.default.url}
                  alt="channel logo"
                />
              )}
            </div>
            <div className={styles.channelInfo}>
              <h4 className={styles.channel}>
                {selectedVideo.snippet.channelTitle}
              </h4>
              {channelInfo && channelInfo.statistics.subscriberCount && (
                <p className={styles.subscriber}>
                  구독자 {formatNumber(channelInfo.statistics.subscriberCount)}
                </p>
              )}
            </div>
          </div>
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
