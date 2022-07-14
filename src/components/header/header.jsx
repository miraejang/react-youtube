import React from 'react';
import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import Search from '../search/search';
import { Link } from 'react-router-dom';

const Header = ({
  searchTerm,
  searchSubmit,
  valueChange,
  clickLogo,
  clickNavBtn,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.menuBox}>
        <div className={styles.navBtn} onClick={clickNavBtn}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className={styles.logo} onClick={clickLogo}>
          <Link to={'/'}>
            <div className={styles.logoIcon}>
              <FontAwesomeIcon icon={faYoutube} />
            </div>
            <span className={styles.logoTxt}>Youtube</span>
          </Link>
        </div>
      </div>
      <Search
        searchSubmit={searchSubmit}
        searchTerm={searchTerm}
        valueChange={valueChange}
      />
      <div className={styles.settingBox}></div>
    </header>
  );
};

export default Header;
