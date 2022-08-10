import React, { useState } from 'react';
import styles from './create_playlist.module.css';

const CreatePlaylis = ({ createFormOpen }) => {
  const [count, setCount] = useState(0);
  const formClass = createFormOpen
    ? `${styles.form}`
    : `${styles.form} ${styles.hide}`;

  const letterCount = e => {
    setCount(e.target.value.length);
  };

  const createFolder = () => {};

  return (
    <form className={formClass} onSubmit={createFolder}>
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
          minLength={1}
          maxLength={20}
        />
        <div className={styles.letterLength}>
          <span>{count} / 20</span>
        </div>
      </div>
      <button className={styles.createBtn}>
        <span>만들기</span>
      </button>
    </form>
  );
};

export default CreatePlaylis;
