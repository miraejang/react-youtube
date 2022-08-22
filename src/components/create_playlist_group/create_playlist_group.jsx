import React, { useRef, useState } from 'react';
import styles from './create_playlist_group.module.css';

const CreatePlaylistGroup = ({ createGroup }) => {
  const formRef = useRef();
  const [count, setCount] = useState(0);
  const [groupName, setGroupName] = useState('');

  const letterCount = e => {
    const name = e.target.value;
    setCount(name.length);
    setGroupName(name);
  };

  const onSubmit = e => {
    e.preventDefault();
    const id = `PLgr${Date.now()}`;
    createGroup(id, groupName);
    setGroupName('');
  };

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
      <div className={styles.inputBox}>
        <label className={styles.label} htmlFor="PlaylistName">
          이름
        </label>
        <input
          onChange={letterCount}
          className={styles.input}
          type="text"
          id="PlaylistName"
          name="PlaylistName"
          placeholder="재생목록 이름"
          value={groupName}
          minLength={1}
          maxLength={20}
        />
        <div className={styles.inputInfo}>
          <div className={styles.errorBox}>
            <p className={styles.errorText}>이미 사용중인 이름입니다.</p>
          </div>
          <div className={styles.countBox}>
            <span>{count} / 20</span>
          </div>
        </div>
      </div>
      <button className={styles.createBtn}>
        <span>만들기</span>
      </button>
    </form>
  );
};

export default CreatePlaylistGroup;
