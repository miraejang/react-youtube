import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './search.module.css';

const Search = ({ searchVideo }) => {
  const [term, setTerm] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    searchVideo(term);
    setTerm('');
  };

  const onChange = e => {
    const term = e.target.value;
    setTerm(term);
  };

  return (
    <div className={styles.searchBox}>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          value={term}
          onChange={onChange}
          className={styles.input}
          type="text"
          placeholder="Search"
        />
        <button className={styles.searchBtn}>
          <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
        </button>
      </form>
    </div>
  );
};

export default Search;
