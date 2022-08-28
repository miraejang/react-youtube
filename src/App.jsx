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
import { useDispatch, useSelector } from 'react-redux';
import {
  setAuthService,
  setUser,
  setUserFeeds,
  setVideoMenu,
  setvideoRepository,
} from './store';
import Library from './screens/library/library';
import Error from './screens/error/error';

function App({ youtube, authService, videoRepository }) {
  const [init, setInit] = useState(false);
  const [navInit, setNavInit] = useState(false);
  const [isWatch, setIsWatch] = useState(false);
  const [navExpand, setNavExpand] = useState(true);
  const [sliderNavOpen, setSliderNavOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const containerRef = useRef(null);
  const auth = useSelector(state => state.auth.data);
  const videoRepo = useSelector(state => state.videoRepo.data);

  useEffect(() => {
    dispatch(setAuthService(authService));
    dispatch(setvideoRepository(videoRepository));
  }, []);

  useEffect(() => {
    auth &&
      auth.onAuthChange(user => {
        if (user) {
          dispatch(
            setUser({
              uid: user.uid,
              name: user.displayName,
              email: user.email,
            })
          );
          videoRepo &&
            videoRepo.syncFeeds(user.uid, feeds => {
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
  }, [auth, videoRepo]);

  useEffect(() => {
    containerRef.current && containerRef.current.scrollTo(0, 0);
    if (location.pathname && location.pathname.search(/^\/watch/) >= 0) {
      setNavInit(false);
      setIsWatch(true);
    } else {
      setIsWatch(false);
      dispatch(setVideoMenu({ listId: null, videoId: null }));
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
            isWatch={isWatch}
            navExpand={navExpand}
            sliderNavOpen={sliderNavOpen}
            setNavType={setNavType}
          />
          <div className={styles.content}>
            <Nav
              navInit={navInit}
              isWatch={isWatch}
              navExpand={navExpand}
              sliderNavOpen={sliderNavOpen}
              setNavType={setNavType}
            />
            <div className={styles.container}>
              <Routes>
                <Route path="/" element={<Home youtube={youtube} />} />
                <Route
                  path="/watch/:id"
                  element={<Watch youtube={youtube} />}
                />
                <Route
                  path="/results"
                  element={<Results youtube={youtube} />}
                />
                <Route
                  path="/history"
                  element={<History youtube={youtube} />}
                />
                <Route
                  path="/playlist"
                  element={<Playlist youtube={youtube} />}
                />
                <Route
                  path="/library"
                  element={<Library youtube={youtube} />}
                />
                <Route path="/error/:code" element={<Error />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
