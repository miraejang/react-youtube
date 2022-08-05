import React, { useRef, useState } from 'react';
import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import Search from '../search/search';
import { Link } from 'react-router-dom';
import Login from '../login/login';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store';

const Header = ({ authService, clickNavBtn }) => {
  const settingsRef = useRef();
  const [settingsDisplay, setSettingsDisplay] = useState(false);
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  const clickAccount = () => {
    settingsRef.current.style.display = settingsDisplay ? 'none' : 'block';
    setSettingsDisplay(!settingsDisplay);
  };

  const logout = () => {
    authService.logout().then(() => dispatch(setUser(null)));
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
        {!user && (
          <div className={styles.account}>
            <Login authService={authService} />
          </div>
        )}
        {user && (
          <div className={styles.account}>
            <button className={styles.accountBtn} onClick={clickAccount}>
              {user.name}
            </button>
            <ul ref={settingsRef} className={styles.settings}>
              <li>
                <button className={styles.logoutBtn} onClick={logout}>
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={faSignOutAlt}
                  />
                  로그아웃
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
