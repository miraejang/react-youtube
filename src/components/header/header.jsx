import React, { useRef, useState } from 'react';
import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import Search from '../search/search';
import { Link } from 'react-router-dom';

const Header = ({ authService, searchVideo, clickNavBtn }) => {
  const settingsRef = useRef();
  const [user, setUser] = useState(null);
  const [settingsDisplay, setSettingsDisplay] = useState(false);

  const login = () => {
    authService
      .login()
      .then(data =>
        setUser({ email: data.user.email, name: data.user.displayName })
      );
  };

  const logout = () => {
    authService.logout();
  };

  const clickAccount = () => {
    settingsRef.current.style.display = settingsDisplay ? 'none' : 'block';
    setSettingsDisplay(!settingsDisplay);
  };

  return (
    <header className={styles.header}>
      <div className={styles.menuBox}>
        <div className={styles.navBtn} onClick={clickNavBtn}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className={styles.logo}>
          <Link to={'/'}>
            <div className={styles.logoIcon}>
              <FontAwesomeIcon icon={faYoutube} />
            </div>
            <span className={styles.logoTxt}>Youtube</span>
          </Link>
        </div>
      </div>
      <Search searchVideo={searchVideo} />
      <div className={styles.accountBox}>
        <div className={styles.account}>
          {!user && (
            <button className={styles.loginBtn} onClick={login}>
              <FontAwesomeIcon className={styles.icon} icon={faUser} />
              로그인
            </button>
          )}
          {user && (
            <button className={styles.accountBtn} onClick={clickAccount}>
              {user.name}
            </button>
          )}
        </div>
        <ul ref={settingsRef} className={styles.settings}>
          <li>
            <button className={styles.logoutBtn} onClick={logout}>
              <FontAwesomeIcon className={styles.icon} icon={faSignOutAlt} />
              로그아웃
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
