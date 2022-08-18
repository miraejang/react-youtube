import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Home from './screens/home';
import Watch from './screens/watch';
import styles from './App.module.css';
import Nav from './components/nav/nav';
import Results from './screens/results';
import Playlist from './screens/playlist/playlist';
import History from './screens/history/history';
import { useDispatch } from 'react-redux';
import { setHistory, setPlaylist, setUser } from './store';

function App({ youtube, authService, videoRepository }) {
  const [navOpen, setNavOpen] = useState(false);
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        dispatch(
          setUser({ uid: user.uid, name: user.displayName, email: user.email })
        );
        videoRepository.syncVideo(user.uid, history => {
          dispatch(setHistory({ ...history }));
        });
        videoRepository.syncPlaylist(user.uid, playlist => {
          if (playlist === null) {
            dispatch(setPlaylist({ WL: { name: '나중에 볼 동영상' } }));
          } else {
            dispatch(setPlaylist({ ...playlist }));
          }
        });
      }
      setInit(true);
    });
  }, []);

  const clickNavBtn = () => {
    setNavOpen(!navOpen);
  };

  const formatDate = date => {
    const arr = date.split(/[-, T]/gi);
    const year = Number(arr[0]);
    const month = Number(arr[1]);
    const day = Number(arr[2]);
    return `${year}. ${month}. ${day}.`;
  };

  const formatNumber = number => {
    number = Number(number);
    if (number > 10000) return `${number / 10000}만`;
    return `${number.toLocaleString('en-IN')}`;
  };

  return (
    <>
      {init && (
        <div className={styles.youtube}>
          <Header authService={authService} clickNavBtn={clickNavBtn} />
          <div className={styles.content}>
            <div className={styles.container}>
              <Nav navOpen={navOpen} authService={authService} />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      youtube={youtube}
                      formatDate={formatDate}
                      formatNumber={formatNumber}
                      videoRepository={videoRepository}
                    />
                  }
                />
                <Route
                  path="/watch/:id"
                  element={
                    <Watch
                      youtube={youtube}
                      formatDate={formatDate}
                      formatNumber={formatNumber}
                      videoRepository={videoRepository}
                    />
                  }
                />
                <Route
                  path="/results"
                  element={
                    <Results
                      youtube={youtube}
                      formatDate={formatDate}
                      formatNumber={formatNumber}
                      videoRepository={videoRepository}
                    />
                  }
                />
                <Route
                  path="/history"
                  element={
                    <History
                      youtube={youtube}
                      formatDate={formatDate}
                      formatNumber={formatNumber}
                      authService={authService}
                      videoRepository={videoRepository}
                    />
                  }
                />
                <Route
                  path="/playlist"
                  element={
                    <Playlist
                      youtube={youtube}
                      formatDate={formatDate}
                      formatNumber={formatNumber}
                      authService={authService}
                      videoRepository={videoRepository}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
