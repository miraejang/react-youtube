import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav_header.module.css';

const NavHeader = ({ isWatch, navExpand, sliderNavOpen, setNavType }) => {
  return (
    <div className={styles.navHeader}>
      <div className={styles.navBtnBox}>
        <button
          className={styles.navBtn}
          onClick={() => setNavType(isWatch ? !sliderNavOpen : !navExpand)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
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
  );
};

export default NavHeader;
