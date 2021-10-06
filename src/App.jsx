import VideoList from './components/video_list/video_list';
import { useEffect, useState } from 'react';
import { searchApi, videosApi } from './api';
import VideoDetail from './components/video_detail/video_detail';
import styles from './App.module.css';
import Header from './components/header/header';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const popular = await videosApi.mostPopular();
    console.log(popular);
    setVideos(popular.data.items);
  };

  const videoClick = video => {
    setSelectedVideo(video);
  };

  const searchSubmit = e => {
    e.preventDefault();
    setSelectedVideo(null);
    searchVideo(searchTerm);
    setSearchTerm('');
  };

  const valueChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const searchVideo = async term => {
    try {
      const result = await searchApi.search(term);
      setVideos(result.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finally');
    }
  };

  return (
    <div className={styles.youtube}>
      <Header searchTerm={searchTerm} searchSubmit={searchSubmit} valueChange={valueChange} />

      <div className={styles.content}>
        {selectedVideo && <VideoDetail selectedVideo={selectedVideo} />}
        <VideoList videos={videos} videoClick={videoClick} selectedVideo={selectedVideo ? true : false} />
      </div>
    </div>
  );
}

export default App;
