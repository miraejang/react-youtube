import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './search.module.css';

const Search = ({ searchSubmit, searchTerm, valueChange }) => (
  <div className={styles.searchBox}>
    <form className={styles.form} onSubmit={searchSubmit}>
      <input value={searchTerm} onChange={valueChange} className={styles.input} type="text" placeholder="Search" />
      <button className={styles.searchBtn}>
        <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
      </button>
    </form>
  </div>
);

export default Search;
