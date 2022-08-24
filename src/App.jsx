import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/header';
import Home from './screens/home/home';
import Watch from './screens/watch/watch';
import styles from './App.module.css';
import Nav from './components/nav/nav';
import Results from './screens/results';
import Playlist from './screens/playlist/playlist';
import History from './screens/history/history';
import { useDispatch } from 'react-redux';
import { setUser, setUserFeeds } from './store';
import Library from './screens/library/library';

function App({ youtube, authService, videoRepository }) {
  const [init, setInit] = useState(false);
  const [navInit, setNavInit] = useState(false);
  const [isWatch, setIsWatch] = useState(false);
  const [navExpand, setNavExpand] = useState(true);
  const [sliderNavOpen, setSliderNavOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        dispatch(
          setUser({ uid: user.uid, name: user.displayName, email: user.email })
        );
        videoRepository.syncFeeds(user.uid, feeds => {
          dispatch(
            setUserFeeds({
              history: feeds.history ? { ...feeds.history } : null,
              wishList: feeds.wishList
                ? { ...feeds.wishList }
                : { name: '나중에 볼 동영상' },
              playlist: feeds.playlist ? { ...feeds.playlist } : null,
            })
          );
        });
      }
      setInit(true);
    });
  }, []);

  useEffect(() => {
    containerRef.current && containerRef.current.scrollTo(0, 0);
    if (location.pathname && location.pathname.search(/^\/watch/) >= 0) {
      setNavInit(false);
      setIsWatch(true);
    } else {
      setIsWatch(false);
    }
  }, [location]);

  const setNavType = state => {
    if (navInit === false) setNavInit(true);

    if (isWatch) {
      setSliderNavOpen(state);
    } else {
      setNavExpand(state);
    }
  };

  return (
    <>
      {init && (
        <div className={styles.youtube}>
          <Header
            authService={authService}
            isWatch={isWatch}
            navExpand={navExpand}
            sliderNavOpen={sliderNavOpen}
            setNavType={setNavType}
          />
          <div className={styles.content}>
            <Nav
              authService={authService}
              navInit={navInit}
              isWatch={isWatch}
              navExpand={navExpand}
              sliderNavOpen={sliderNavOpen}
              setNavType={setNavType}
            />
            <div className={styles.container}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home youtube={youtube} videoRepository={videoRepository} />
                  }
                />
                <Route
                  path="/watch/:id"
                  element={
                    <Watch
                      youtube={youtube}
                      videoRepository={videoRepository}
                    />
                  }
                />
                <Route
                  path="/results"
                  element={
                    <Results
                      youtube={youtube}
                      videoRepository={videoRepository}
                    />
                  }
                />
                <Route
                  path="/history"
                  element={
                    <History
                      youtube={youtube}
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
                      authService={authService}
                      videoRepository={videoRepository}
                    />
                  }
                />
                <Route
                  path="/library"
                  element={
                    <Library
                      youtube={youtube}
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
