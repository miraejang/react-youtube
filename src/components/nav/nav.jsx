import {
  faClock,
  faFolder,
  faHistory,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from '../login/login';
import styles from './nav.module.css';

const Nav = ({ navOpen, authService }) => {
  const navRef = useRef();
  const user = useSelector(state => state.user.data);
  const playlist = useSelector(state => state.playlist.data);

  useEffect(() => {
    navRef.current.style.display = navOpen ? 'block' : 'none';
  }, [navOpen]);

  return (
    <nav className={styles.nav} ref={navRef}>
      <Link to={'/'} className={styles.item}>
        <FontAwesomeIcon icon={faHome} className={styles.icon} />
        <span className={styles.text}>홈</span>
      </Link>
      <Link to={'/history'} className={styles.item}>
        <FontAwesomeIcon icon={faHistory} className={styles.icon} />
        <span className={styles.text}>시청 기록</span>
      </Link>
      {user && (
        <>
          <Link
            to={{
              pathname: '/playlist',
              search: `?list=WL`,
            }}
            className={styles.item}
          >
            <FontAwesomeIcon icon={faClock} className={styles.icon} />
            <span className={styles.text}>나중에 볼 동영상</span>
          </Link>
          {playlist &&
            Object.keys(playlist)
              .reverse()
              .map(listId => {
                if (listId !== 'WL') {
                  return (
                    <Link
                      to={{
                        pathname: '/playlist',
                        search: `?list=${listId}`,
                      }}
                      className={styles.item}
                      key={listId}
                    >
                      <FontAwesomeIcon
                        icon={faFolder}
                        className={styles.icon}
                      />
                      <span className={styles.text}>
                        {playlist[listId].name}
                      </span>
                    </Link>
                  );
                }
              })}
        </>
      )}
      {!user && (
        <div className={styles.loginBox}>
          <p className={styles.loginText}>
            로그인하면 저장된 동영상 리스트를 볼 수 있습니다.
          </p>
          <Login authService={authService} />
        </div>
      )}
    </nav>
  );
};

export default Nav;
