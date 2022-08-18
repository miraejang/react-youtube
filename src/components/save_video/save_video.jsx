import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CreatePlaylistGroup from '../create_playlist_group/create_playlist_group';
import styles from './save_video.module.css';

const SaveVideo = ({
  closePopup,
  videoRepository,
  videoId,
  thumbnail,
  channelId,
}) => {
  const popupRef = useRef();
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const user = useSelector(state => state.user.data);
  const playlist = useSelector(state => state.playlist.data);

  const createGroup = (id, folderName) => {
    const alreadyUsed = Object.keys(playlist).find(
      listId => playlist[listId].name === folderName
    );

    if (!alreadyUsed) {
      videoRepository.savePlaylist(user.uid, id, {
        name: folderName,
      });
    } else {
      console.log('이미 사용된 이름');
    }
  };

  const onClick = e => {
    e.stopPropagation();
    const popupOutside = e.target.contains(popupRef.current);

    if (popupOutside) {
      closePopup();
    }
  };

  const toggleForm = () => {
    setCreateFormOpen(!createFormOpen);
  };

  const onChange = e => {
    const checked = e.currentTarget.checked;
    const id = e.currentTarget.value;
    const name = e.currentTarget.parentNode.querySelector('label').innerText;

    const videos =
      (playlist &&
        playlist[id] &&
        playlist[id].videos &&
        playlist[id].videos.filter(video => video.videoId !== videoId)) ||
      [];

    if (checked) {
      videoRepository.savePlaylist(user.uid, id, {
        name,
        lastUpdate: new Date().toLocaleDateString(),
        videos: [
          {
            videoId,
            thumbnail,
            channelId,
          },
          ...videos,
        ],
      });
    } else {
      videoRepository.savePlaylist(user.uid, id, {
        name,
        lastUpdate: playlist[id].lastUpdate,
        thumbnail: playlist[id].thumbnail,
        videos: [...videos],
      });
    }
  };

  return (
    <div className={styles.saveVideoPopup} onClick={onClick}>
      <div className={styles.popupContainer}>
        <div ref={popupRef} className={styles.popup}>
          <div className={styles.header}>
            <p className={styles.title}>저장하기</p>
            <button className={styles.closeBtn} onClick={closePopup}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className={styles.content}>
            <ul className={styles.folderList}>
              {playlist &&
                Object.keys(playlist)
                  .reverse()
                  .map(listId => (
                    <li className={styles.playlist} key={listId}>
                      <input
                        onChange={onChange}
                        className={styles.checkbox}
                        type="checkbox"
                        name={listId}
                        id={listId}
                        value={listId}
                        checked={
                          playlist[listId].videos &&
                          playlist[listId].videos.find(
                            video => video.videoId === videoId
                          )
                            ? true
                            : false
                        }
                      />
                      <label className={styles.label} htmlFor={listId}>
                        {playlist[listId].name}
                      </label>
                    </li>
                  ))}
            </ul>
          </div>
          <div className={styles.footer}>
            {createFormOpen ? (
              <CreatePlaylistGroup
                createFormOpen={createFormOpen}
                createGroup={createGroup}
              />
            ) : (
              <button className={styles.addFolderBtn} onClick={toggleForm}>
                <FontAwesomeIcon className={styles.plusIcon} icon={faPlus} />
                <span>새 재생목록 만들기</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveVideo;
