import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Home from './screens/home/home';
import Watch from './screens/watch/watch';
import styles from './App.module.css';
import Nav from './components/nav/nav';

function App({ youtube, authService }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [navOpen, setNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularVideo();
  }, [youtube]);

  const getPopularVideo = () => {
    setLoading(true);
    youtube
      .mostPopular() //
      .then(videos => setVideos(videos))
      .then(() => setLoading(false));
  };

  const searchSubmit = e => {
    e.preventDefault();
    setSelectedVideo(null);
    searchVideo(searchTerm);
  };

  const valueChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const searchVideo = query => {
    setLoading(true);
    youtube
      .search(query) //
      .then(videos => setVideos(videos))
      .then(() => setLoading(false));
  };

  const clickVideo = (videoId, channelId) => {
    setLoading(true);
    setSearchTerm('');
    youtube
      .getAllData(videoId, channelId) //
      .then(data => setSelectedVideo({ video: data[0], channel: data[1] }))
      .then(() => setLoading(false));
  };

  const clickLogo = () => {
    setSelectedVideo(null);
    setSearchTerm('');
    getPopularVideo();
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
        searchTerm={searchTerm}
        searchSubmit={searchSubmit}
        valueChange={valueChange}
        clickLogo={clickLogo}
        clickNavBtn={clickNavBtn}
      />
      <div className={styles.content}>
        <Nav navOpen={navOpen} selectedVideo={selectedVideo} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                youtube={youtube}
                loading={loading}
                videos={videos}
                selectedVideo={selectedVideo}
                clickVideo={clickVideo}
                formatDate={formatDate}
                formatNumber={formatNumber}
              />
            }
          />
          <Route path="/watch">
            <Route
              path=":id"
              element={
                <Watch
                  youtube={youtube}
                  loading={loading}
                  videos={videos}
                  selectedVideo={selectedVideo}
                  clickVideo={clickVideo}
                  formatDate={formatDate}
                  formatNumber={formatNumber}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
