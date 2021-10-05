import React from 'react';
import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

function Header({ searchTerm, searchSubmit, valueChange }) {
  return (
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
      <div className={styles.searchBox}>
        <form className={styles.form} onSubmit={searchSubmit}>
          <input value={searchTerm} onChange={valueChange} className={styles.input} type="text" placeholder="Search" />
          <button className={styles.searchBtn}>
            <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
          </button>
        </form>
      </div>
      <div className={styles.settingBox}></div>
    </header>
  );
}

export default Header;
