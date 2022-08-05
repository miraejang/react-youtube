import React, { useRef, useState } from 'react';
import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import Search from '../search/search';
import { Link } from 'react-router-dom';
import Login from '../login/login';
import { useSelector } from 'react-redux';

const Header = ({ authService, clickNavBtn }) => {
  const settingsRef = useRef();
  const [settingsDisplay, setSettingsDisplay] = useState(false);
  const user = useSelector(state => state.user.data);

  const clickAccount = () => {
    settingsRef.current.style.display = settingsDisplay ? 'none' : 'block';
    setSettingsDisplay(!settingsDisplay);
  };

  const logout = () => {
    authService.logout();
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
      <Search />
      <div className={styles.accountBox}>
        <div className={styles.account}>
          {!user && <Login authService={authService} />}
          {user && <button className={styles.accountBtn}>{user.name}</button>}
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
