import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import VideoList from '../../components/video_list/video_list';
import styles from './playlist.module.css';

const Playlist = ({ youtube, videoRepository }) => {
  const { wishList, playlist } = useSelector(state => state.userFeeds);
  const { search } = useLocation();
  const [group, setGroup] = useState({});

  useEffect(() => {
    const groupId = search.replace('?list=', '');
    if (wishList && playlist) {
      const group = groupId === 'WL' ? wishList : playlist[groupId];
      setGroup({ ...group });
    }
  }, [search, wishList, playlist]);

  return (
    <div className={styles.playlist}>
      <div className={styles.groupInfo}>
        <div className={styles.info}>
          <div className={styles.thumbnail}>
            {group.thumbnail && <img src={group.thumbnail} alt="thumbnail" />}
            {!group.thumbnail && (
              <div className={styles.defaultImg}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faEllipsis}
                  size={'4x'}
                />
              </div>
            )}
          </div>
          <h3>{group.name}</h3>
          <div className={styles.meta}>
            <span className={styles.vidoeCount}>
              동영상 {group.videos ? `${group.videos.length}개` : '없음'}
            </span>
            {group.lastUpdate && (
              <>
                <span> • </span>
                <span className={styles.lastUpdate}>
                  최종 업데이트: {group.lastUpdate}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {group.videos && (
          <VideoList
            youtube={youtube}
            videos={group.videos}
            page="playlist"
            videoRepository={videoRepository}
          />
        )}
        {!group.videos && (
          <p className={styles.emptyTxt}>아직 재생목록에 동영상이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
