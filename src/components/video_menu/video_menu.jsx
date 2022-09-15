import { faEllipsisV, faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import SaveVideo from '../save_video/save_video';
import styles from './video_menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoMenu } from '../../store';

const VideoMenu = ({
  videoData,
  videoId,
  thumbnail,
  channelId,
  hover,
  listId,
  videoMenuOpen,
}) => {
  const [saveVideoOpen, setSaveVideoOpen] = useState(false);
  const user = useSelector(state => state.authService.user);
  const {
    repository: videoRepo,
    feeds: { wishList },
  } = useSelector(state => state.videoRepository);
  const dispatch = useDispatch();

  const closePopup = e => {
    e.preventDefault();
    setSaveVideoOpen(false);
  };

  const saveWishList = e => {
    e.preventDefault();
    const videos = wishList.videos || [];
    const alreadySaved = videos.find(
      videoData =>
        (videoData.video.id.videoId || videoData.video.id) === videoId
    )
      ? true
      : false;

    if (!alreadySaved) {
      videoRepo.savePlaylist(user.uid, 'WL', {
        name: wishList.name,
        lastUpdate: new Date().toLocaleDateString(),
        thumbnail:
          videos.length > 0
            ? videos[0].video.snippet.thumbnails.medium.url
            : thumbnail,
        videos: [videoData, ...videos],
      });
    }
  };

  const savePlaylist = e => {
    e.preventDefault();
    setSaveVideoOpen(true);
  };

  const toggleMenu = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setVideoMenu({ listId, videoId }));
  };

  return (
    <div className={styles.videoMenu}>
      <button
        className={`${styles.menuBtn} ${hover && styles.show}`}
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faEllipsisV} className={styles.ellipsis} />
      </button>
      {videoMenuOpen && (
        <div className={styles.menuList}>
          <ul className={styles.list}>
            <li className={styles.item} onClick={saveWishList}>
              <FontAwesomeIcon icon={faClock} className={styles.icon} />
              <p className={styles.txt}>나중에 볼 동영상에 저장</p>
            </li>
            <li className={styles.item} onClick={savePlaylist}>
              <FontAwesomeIcon icon={faFolderClosed} className={styles.icon} />
              <p className={styles.txt}>재생목록에 저장</p>
              {saveVideoOpen && (
                <SaveVideo
                  videoId={videoId}
                  thumbnail={thumbnail}
                  channelId={channelId}
                  closePopup={closePopup}
                />
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default VideoMenu;
