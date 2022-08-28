import React, { useRef, useState } from 'react';
import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Search from '../search/search';
import Login from '../login/login';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store';
import NavHeader from '../nav_header/nav_header';

const Header = ({ isWatch, navExpand, sliderNavOpen, setNavType }) => {
  const settingsRef = useRef();
  const [settingsDisplay, setSettingsDisplay] = useState(false);
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.data);

  const clickAccount = () => {
    settingsRef.current.style.display = settingsDisplay ? 'none' : 'block';
    setSettingsDisplay(!settingsDisplay);
  };

  const logout = () => {
    auth.logout().then(() => dispatch(setUser(null)));
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <NavHeader
            isWatch={isWatch}
            navExpand={navExpand}
            sliderNavOpen={sliderNavOpen}
            setNavType={setNavType}
          />
        </div>
        <div className={styles.center}>
          <Search />
        </div>
        <div className={styles.right}>
          {!user && (
            <div className={styles.account}>
              <Login />
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
      </div>
    </header>
  );
};

export default Header;
