import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './error.module.css';

const Error = props => {
  const { code } = useParams();

  return (
    <div className={styles.error}>
      <div className={styles.title}>
        <h3>{code}</h3>
      </div>
      <div className={styles.content}>
        {code === '403' && (
          <p>
            Youtube API 할당량을 초과했습니다. <br />
            내일 오후 4시에 다시 확인해주세요.
          </p>
        )}
      </div>
    </div>
  );
};

export default Error;
