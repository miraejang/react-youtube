import { useEffect, useState } from 'react';
import styles from './app.module.css';
import Header from './components/header/header';
import Content from './components/content/content';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [navIsOpen, setNavIsOpen] = useState(false);

  useEffect(() => {
    getPopularVideo();
  }, [youtube]);

  const getPopularVideo = () => {
    youtube
      .mostPopular() //
      .then(videos => setVideos(videos));
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
    youtube
      .search(query) //
      .then(videos => setVideos(videos));
  };

  const clickVideo = (videoId, channelId) => {
    setSearchTerm('');
    youtube
      .getAllData(videoId, channelId) //
      .then(data => setSelectedVideo({ video: data[0], channel: data[1] }));
  };

  const clickLogo = () => {
    setSelectedVideo(null);
    setSearchTerm('');
    getPopularVideo();
  };

  const clickNavBtn = status => {
    console.log('click');
    setNavIsOpen(!status);
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
  const onClickMenu = e => {
    console.log(e.currentTarget.className);
  };

  return (
    <div className={styles.youtube}>
      <Header
        searchTerm={searchTerm}
        searchSubmit={searchSubmit}
        valueChange={valueChange}
        clickLogo={clickLogo}
        clickNavBtn={clickNavBtn}
      />
      <Content
        youtube={youtube}
        videos={videos}
        selectedVideo={selectedVideo}
        formatDate={formatDate}
        formatNumber={formatNumber}
        clickVideo={clickVideo}
        onClickMenu={onClickMenu}
      />
    </div>
  );
}

export default App;
