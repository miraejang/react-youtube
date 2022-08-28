import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store';
import styles from './login.module.css';

const Login = ({}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.authService.auth);

  const login = () => {
    auth.persistence().then(() =>
      auth.login().then(data => {
        const uid = data.user.uid;
        dispatch(
          setUser({
            uid,
            name: data.user.displayName,
            email: data.user.email,
          })
        );
      })
    );
  };

  return (
    <button className={styles.loginBtn} onClick={login}>
      <FontAwesomeIcon className={styles.icon} icon={faUser} />
      로그인
    </button>
  );
};

export default Login;
