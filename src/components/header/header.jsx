import React from 'react';
import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import Search from '../search/search';

const Header = ({ searchTerm, searchSubmit, valueChange }) => (
  <header className={styles.header}>
    <div className={styles.menuBox}>
      <div className={styles.menuBtn}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <FontAwesomeIcon icon={faYoutube} />
        </div>
        <span className={styles.logoTxt}>Youtube</span>
      </div>
    </div>
    <Search searchSubmit={searchSubmit} searchTerm={searchTerm} valueChange={valueChange} />
    <div className={styles.settingBox}></div>
  </header>
);

export default Header;
