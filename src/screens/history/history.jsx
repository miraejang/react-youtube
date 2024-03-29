import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Login from '../../components/login/login';
import styles from './history.module.css';
import VideoList from '../../components/video_list/video_list';

const History = () => {
  const user = useSelector(state => state.authService.user);
  const history = useSelector(state => state.videoRepository.feeds.history);
  const sortedDate =
    history && Object.keys(history).sort((a, b) => parseInt(b) - parseInt(a));

  const transformDate = date => {
    const t = new Date();
    const y = t.getFullYear();
    const m = t.getMonth();
    const d = t.getDate();

    const savedY = parseInt(date.slice(0, 4));
    const savedM = parseInt(date.slice(4, 6));
    const savedD = parseInt(date.slice(6, 8));
    const savedDate = `${new Date(savedY, savedM - 1, savedD)}`;

    const dayMaker = day => {
      switch (day) {
        case 'Mon':
          return '월요일';
        case 'Tue':
          return '화요일';
        case 'Wed':
          return '수요일';
        case 'Thu':
          return '목요일';
        case 'Fri':
          return '금요일';
        case 'Sat':
          return '토요일';
        case 'Sun':
          return '일요일';
        default:
          return;
      }
    };

    switch (savedDate) {
      case `${new Date(y, m, d)}`:
        return '오늘';
      case `${new Date(y, m, d - 1)}`:
        return '어제';
      case `${new Date(y, m, d - 2)}`:
      case `${new Date(y, m, d - 3)}`:
      case `${new Date(y, m, d - 4)}`:
      case `${new Date(y, m, d - 5)}`:
      case `${new Date(y, m, d - 6)}`:
      case `${new Date(y, m, d - 7)}`:
        return dayMaker(savedDate.slice(0, 3));
      default:
        if (y === savedY) {
          return `${savedM}월 ${savedD}일`;
        } else {
          return `${savedY}년 ${savedM}월 ${savedD}일`;
        }
    }
  };

  return (
    <div className={`${styles.history} ${!user && styles.logout}`}>
      <div className={styles.container}>
        {user && (
          <>
            <div className={styles.title}>
              <h3>시청 기록</h3>
            </div>
            {history &&
              sortedDate.map(date => (
                <div className={styles.dayHistory} key={date}>
                  <p className={styles.dateTitle}>{transformDate(date)}</p>
                  <VideoList
                    videos={history[date]}
                    page="history"
                    listId={`history${date}`}
                  />
                </div>
              ))}
          </>
        )}
        {!user && (
          <>
            <FontAwesomeIcon icon={faHistory} size={'5x'} />
            <h2 className={styles.title}>시청한 동영상을 확인하세요.</h2>
            <p className={styles.desc}>
              로그아웃하면 시청 기록을 볼 수 없습니다.
            </p>
            <Login />
          </>
        )}
      </div>
    </div>
  );
};

export default History;
