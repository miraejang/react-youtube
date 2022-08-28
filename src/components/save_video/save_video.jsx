import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CreatePlaylistGroup from '../create_playlist_group/create_playlist_group';
import styles from './save_video.module.css';

const SaveVideo = ({ closePopup, videoId, thumbnail, channelId }) => {
  const popupRef = useRef();
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const user = useSelector(state => state.user.data);
  const { wishList, playlist } = useSelector(state => state.userFeeds);
  const groups = { WL: { ...wishList }, ...playlist };
  const videoRepo = useSelector(state => state.videoRepo.data);

  const createGroup = (id, groupName) => {
    const alreadyUsed =
      groups &&
      Object.keys(groups).find(groupId => groups[groupId].name === groupName);

    if (!alreadyUsed) {
      videoRepo.savePlaylist(user.uid, id, {
        name: groupName,
      });
    } else {
      console.log('이미 사용된 이름');
    }
  };

  const onClick = e => {
    e.stopPropagation();
    const popupOutside = e.target.contains(popupRef.current);

    if (popupOutside) {
      closePopup(e);
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
      (groups &&
        groups[id] &&
        groups[id].videos &&
        groups[id].videos.filter(video => video.videoId !== videoId)) ||
      [];

    if (checked) {
      videoRepo.savePlaylist(user.uid, id, {
        name,
        lastUpdate: new Date().toLocaleDateString(),
        thumbnail: videos.length > 0 ? videos[0].thumbnail : thumbnail,
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
      videoRepo.savePlaylist(user.uid, id, {
        name,
        lastUpdate: groups[id].lastUpdate,
        thumbnail: videos.length > 0 ? groups[id].thumbnail : null,
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
            <ul className={styles.groups}>
              {groups &&
                Object.keys(groups).map(id => {
                  const gorup = groups[id];
                  const checked =
                    gorup.videos &&
                    gorup.videos.find(video => video.videoId === videoId)
                      ? true
                      : false;

                  return (
                    <li className={styles.playlist} key={id}>
                      <input
                        onChange={onChange}
                        className={styles.checkbox}
                        type="checkbox"
                        name={id}
                        id={id}
                        value={id}
                        checked={checked}
                      />
                      <label className={styles.label} htmlFor={id}>
                        {gorup.name}
                      </label>
                    </li>
                  );
                })}
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
