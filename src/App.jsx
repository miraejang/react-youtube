import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Home from './screens/home';
import Watch from './screens/watch';
import styles from './App.module.css';
import Nav from './components/nav/nav';
import Results from './screens/results';

function App({ youtube, authService }) {
  const [videos, setVideos] = useState([]);
  const [navOpen, setNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularVideo();
  }, [youtube]);

  const getPopularVideo = () => {
    setLoading(true);
    youtube
      .mostPopular() //
      .then(videos => {
        setVideos(videos);
        setLoading(false);
      });
  };

  const searchVideo = query => {
    setLoading(true);
    youtube
      .search(query) //
      .then(videos => {
        setVideos(videos);
        setLoading(false);
      });
  };

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
    <div className={styles.youtube}>
      <Header
        authService={authService}
        searchVideo={searchVideo}
        clickNavBtn={clickNavBtn}
      />
      <div className={styles.content}>
        <Nav navOpen={navOpen} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                youtube={youtube}
                loading={loading}
                videos={videos}
                formatDate={formatDate}
                formatNumber={formatNumber}
              />
            }
          />
          <Route
            path="/watch/:id"
            element={
              <Watch
                youtube={youtube}
                loading={loading}
                videos={videos}
                formatDate={formatDate}
                formatNumber={formatNumber}
              />
            }
          />
          <Route
            path="/results"
            element={
              <Results
                youtube={youtube}
                loading={loading}
                videos={videos}
                formatDate={formatDate}
                formatNumber={formatNumber}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
