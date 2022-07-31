import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './loading.module.css';

const Loading = props => (
  <div className={styles.loadingScreen}>
    <div className={styles.loadingSpinner}>
      <FontAwesomeIcon icon={faSpinner} size="3x" />
    </div>
  </div>
);

export default Loading;
