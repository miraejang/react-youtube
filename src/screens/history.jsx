import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Login from '../components/login/login';

const History = props => {
  const user = useSelector(state => state.user.data);
  console.log(user);

  return (
    <>
      {user && <p>History</p>}
      {!user && (
        <div>
          <FontAwesomeIcon icon={faHistory} size={'5x'} />
          <h3>시청한 동영상을 확인하세요.</h3>
          <p className="desc">로그아웃하면 시청 기록을 볼 수 없습니다.</p>
          <Login />
        </div>
      )}
    </>
  );
};

export default History;
