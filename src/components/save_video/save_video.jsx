import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import CreatePlaylis from '../create_playlist/create_playlis';
import styles from './save_video.module.css';

const SaveVideo = ({ closePopup }) => {
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const popupRef = useRef();

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
              <li className={styles.playlist}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name="WL"
                  id="WL"
                />
                <label className={styles.label} htmlFor="WL">
                  나중에 볼 동영상
                </label>
              </li>
              <li className={styles.playlist}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name="sample"
                  id="sample"
                />
                <label className={styles.label} htmlFor="sample">
                  일할 때 듣기 좋은 음악
                </label>
              </li>
            </ul>
          </div>
          <div className={styles.footer}>
            {createFormOpen ? (
              <CreatePlaylis createFormOpen={createFormOpen} />
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
