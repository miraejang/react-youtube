import {
  faClock,
  faFolder,
  faHistory,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.module.css';

const Nav = ({ navOpen }) => {
  // const type
  const navRef = useRef();

  useEffect(() => {
    navRef.current.style.display = navOpen ? 'block' : 'none';
  }, [navOpen]);

  return (
    <nav ref={navRef}>
      <Link to={'/'} className={styles.item}>
        <FontAwesomeIcon icon={faHome} className={styles.icon} />
        <span className={styles.text}>홈</span>
      </Link>
      <Link to={'/history'} className={styles.item}>
        <FontAwesomeIcon icon={faHistory} className={styles.icon} />
        <span className={styles.text}>시청 기록</span>
      </Link>
      <Link to={'/saved-video'} className={styles.item}>
        <FontAwesomeIcon icon={faClock} className={styles.icon} />
        <span className={styles.text}>나중에 볼 동영상</span>
      </Link>
      <Link to={'/plyalist'} className={styles.item}>
        <FontAwesomeIcon icon={faFolder} className={styles.icon} />
        <span className={styles.text}>재생목록</span>
      </Link>
    </nav>
  );
};

export default Nav;
