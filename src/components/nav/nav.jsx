import {
  faFolderClosed,
  faRectangleList,
} from '@fortawesome/free-regular-svg-icons';
import {
  faClock,
  faHistory,
  faHome,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from '../login/login';
import NavHeader from '../nav_header/nav_header';
import styles from './nav.module.css';

const Nav = ({ navInit, isWatch, navExpand, sliderNavOpen, setNavType }) => {
  const user = useSelector(state => state.authService.user);
  const playlist = useSelector(state => state.videoRepository.feeds.playlist);
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
    const navOutside =
      e.target !== navRef.current && e.target.contains(navRef.current);

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
                  <Link to={'/playlist?list=WL'} className={styles.link}>
                    <FontAwesomeIcon icon={faClock} className={styles.icon} />
                    <span className={styles.text}>나중에 볼 동영상</span>
                  </Link>
                </li>
                {playlist &&
                  Object.keys(playlist).map(id => (
                    <li
                      className={`${styles.item} ${styles.playlist}`}
                      key={id}
                    >
                      <Link
                        to={{
                          pathname: '/playlist',
                          search: `?list=${id}`,
                        }}
                        className={styles.link}
                      >
                        <FontAwesomeIcon
                          icon={faFolderClosed}
                          className={styles.icon}
                        />
                        <span className={styles.text}>{playlist[id].name}</span>
                      </Link>
                    </li>
                  ))}

                <li className={styles.item}>
                  <Link to={'/playlist?list=LL'} className={styles.link}>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className={styles.icon}
                    />
                    <span className={styles.text}>좋아요 표시한 동영상</span>
                  </Link>
                </li>
              </ul>
            )}
            {!user && (
              <div className={styles.loginBox}>
                <p className={styles.loginText}>
                  로그인하면 저장된 동영상 리스트를 볼 수 있습니다.
                </p>
                <Login />
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
