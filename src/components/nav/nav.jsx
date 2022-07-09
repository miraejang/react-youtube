import React from 'react';
import styles from './nav.module.css';

const Nav = ({ onClickMenu }) => {
  return (
    <nav className={styles.nav}>
      <p onClick={onClickMenu} className="home">
        {/* <FontAwesomeIcon icon={faHouse} /> */}
        <span className="text">home</span>
      </p>
      <p onClick={onClickMenu} className="history">
        {/* <FontAwesomeIcon icon={faClockRotateLeft} /> */}
        <span className="text">시청 기록</span>
      </p>
      <p onClick={onClickMenu} className="later">
        {/* <FontAwesomeIcon icon={faClock} /> */}
        <span className="text">나중에 볼 동영상</span>
      </p>
      <p onClick={onClickMenu} className="plyalist">
        {/* <FontAwesomeIcon icon={'folder'}> */}
        <span className="text">재생목록</span>
      </p>
    </nav>
  );
};

export default Nav;
