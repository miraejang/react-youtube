import {
  faClock,
  faFolderTree,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VideoList from '../../components/video_list/video_list';
import styles from './library.module.css';

const Library = ({ youtube, formatDate, formatNumber, videoRepository }) => {
  const page = 'library';
  const { history, wishList, playlist } = useSelector(state => state.userFeeds);
  const historyVideos =
    history &&
    Object.keys(history)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .reduce((all, date) => {
        // 이미 있는 동영상 제거
        const dayVideos = history[date].reduce(
          (day, video) =>
            all.find(el => el.videoId === video.videoId)
              ? day
              : [{ ...video }, ...day],
          []
        );
        return [...dayVideos, ...all];
      }, [])
      .slice(0, 10);

  return (
    <div className={styles.library}>
      <div className={styles.container}>
        <section className={`${styles.section} ${styles.history}`}>
          <div className={styles.header}>
            <div className={styles.title}>
              <FontAwesomeIcon icon={faHistory} className={styles.icon} />
              <h4>기록</h4>
            </div>
            <Link className={styles.moreBtn} to={'/history'}>
              모두 보기
            </Link>
          </div>
          <div className={styles.content}>
            {historyVideos && (
              <VideoList
                youtube={youtube}
                videos={historyVideos}
                formatDate={formatDate}
                formatNumber={formatNumber}
                page={page}
                videoRepository={videoRepository}
              />
            )}
            {!historyVideos && (
              <p className={styles.emptyTxt}>
                시청한 동영상이 여기에 표시됩니다.
              </p>
            )}
          </div>
        </section>
        <section className={`${styles.section} ${styles.wishList}`}>
          <div className={styles.header}>
            <div className={styles.title}>
              <FontAwesomeIcon icon={faClock} className={styles.icon} />
              <h4>나중에 볼 동영상</h4>
            </div>
            <Link className={styles.moreBtn} to={'/playlist?list=WL'}>
              모두 보기
            </Link>
          </div>
          <div className={styles.content}>
            {wishList && (
              <VideoList
                youtube={youtube}
                videos={wishList.videos.slice(0, 5)}
                formatDate={formatDate}
                formatNumber={formatNumber}
                page={page}
                videoRepository={videoRepository}
              />
            )}
            {!wishList && (
              <p className={styles.emptyTxt}>
                동영상을 나중에 볼 동영상에 저장해 보세요. 목록이 여기에
                표시됩니다.
              </p>
            )}
          </div>
        </section>
        <section className={`${styles.section} ${styles.playlist}`}>
          <div className={styles.header}>
            <div className={styles.title}>
              <FontAwesomeIcon icon={faFolderTree} className={styles.icon} />
              <h4>재생목록</h4>
            </div>
          </div>
          <div className={styles.content}>
            {playlist && (
              <ul>
                {Object.keys(playlist).map(id => (
                  <li key={id}>
                    <Link to={`/playlist?${id}`}>
                      <img src={playlist[id].thumbnail} alt="thumbnail" />
                      <p>{playlist[id].name}</p>
                      <p>{playlist[id].lastUpdate}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {!playlist && (
              <p className={styles.emptyTxt}>
                만들거나 저자한 재생목록이 여기에 표시됩니다.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Library;
