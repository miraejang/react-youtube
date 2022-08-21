import {
  faFolderClosed,
  faRectangleList,
} from '@fortawesome/free-regular-svg-icons';
import { faClock, faHistory, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from '../login/login';
import NavHeader from '../nav_header/nav_header';
import styles from './nav.module.css';

const Nav = ({
  authService,
  navInit,
  isWatch,
  navExpand,
  sliderNavOpen,
  setNavType,
}) => {
  const user = useSelector(state => state.user.data);
  const playlist = useSelector(state => state.playlist.data);
  const navRef = useRef();

  const typeClass = () => {
    const type = [];
    if (isWatch) {
      type.push(styles.slider, styles.expand);
      type.push(sliderNavOpen ? styles.open : styles.close);
      if (navInit) {
        type.push(styles.show);
      } else {
        type.push(styles.hide);
      }
    } else {
      type.push(navExpand ? styles.expand : styles.compact);
    }
    return type.join(' ');
  };

  const closeNav = e => {
    e.stopPropagation();
    const navOutside = e.target.contains(navRef.current);

    if (navOutside) {
      setNavType(false);
    }
  };

  return (
    <div className={typeClass()} onClick={closeNav}>
      <div className={styles.container}>
        <nav ref={navRef} className={styles.nav}>
          <NavHeader
            isWatch={isWatch}
            navExpand={navExpand}
            sliderNavOpen={sliderNavOpen}
            setNavType={setNavType}
          />
          <div className={styles.content}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <Link to={'/'} className={styles.link}>
                  <FontAwesomeIcon icon={faHome} className={styles.icon} />
                  <span className={styles.text}>홈</span>
                </Link>
              </li>
              <li className={styles.item}>
                <Link to={'/history'} className={styles.link}>
                  <FontAwesomeIcon icon={faHistory} className={styles.icon} />
                  <span className={styles.text}>시청 기록</span>
                </Link>
              </li>
            </ul>
            {user && (
              <ul className={`${styles.list} ${styles.user}`}>
                <li className={styles.item}>
                  <Link to={'/library'} className={styles.link}>
                    <FontAwesomeIcon
                      icon={faRectangleList}
                      className={styles.icon}
                    />
                    <span className={styles.text}>보관함</span>
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link
                    to={{
                      pathname: '/playlist',
                      search: `?list=WL`,
                    }}
                    className={styles.link}
                  >
                    <FontAwesomeIcon icon={faClock} className={styles.icon} />
                    <span className={styles.text}>나중에 볼 동영상</span>
                  </Link>
                </li>
                {playlist &&
                  Object.keys(playlist)
                    .reverse()
                    .map(listId => {
                      if (listId !== 'WL') {
                        return (
                          <li
                            className={`${styles.item} ${styles.playlist}`}
                            key={listId}
                          >
                            <Link
                              to={{
                                pathname: '/playlist',
                                search: `?list=${listId}`,
                              }}
                              className={styles.link}
                            >
                              <FontAwesomeIcon
                                icon={faFolderClosed}
                                className={styles.icon}
                              />
                              <span className={styles.text}>
                                {playlist[listId].name}
                              </span>
                            </Link>
                          </li>
                        );
                      }
                    })}
              </ul>
            )}
            {!user && (
              <div className={styles.loginBox}>
                <p className={styles.loginText}>
                  로그인하면 저장된 동영상 리스트를 볼 수 있습니다.
                </p>
                <Login authService={authService} />
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
