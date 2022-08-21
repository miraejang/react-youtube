import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import VideoList from '../../components/video_list/video_list';
import styles from './playlist.module.css';

const Playlist = ({ youtube, formatDate, formatNumber, videoRepository }) => {
  const playlist = useSelector(state => state.playlist.data);
  const { search } = useLocation();
  const [group, setGroup] = useState({});

  useEffect(() => {
    const listId = search.replace('?list=', '');
    playlist && setGroup({ ...playlist[listId] });
  }, [search, playlist]);

  return (
    <div className={styles.playlist}>
      <div className={styles.container}>
        <div className={styles.listInfoBox}>
          <div className={styles.listInfo}>
            <div className={styles.imgBox}>
              {group.videos && (
                <img src={group.videos[0].thumbnail} alt="thumbnail" />
              )}
            </div>
            <h3>{group.name}</h3>
            <div className={styles.info}>
              <span className={styles.vidoeCount}>
                동영상 {group.videos ? `${group.videos.length}개` : '없음'}
              </span>
              <span> • </span>
              <span className={styles.lastUpdate}>
                최종 업데이트: {group.videos && group.lastUpdate}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.container}>
            {group.videos && (
              <VideoList
                youtube={youtube}
                videos={group.videos}
                formatDate={formatDate}
                formatNumber={formatNumber}
                page="palylist"
                videoRepository={videoRepository}
              />
            )}
            {!group.videos && <p>아직 재생목록에 동영상이 없습니다.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
