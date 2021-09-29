import VideoList from './components/video_list/video_list';
import { useEffect, useState } from 'react';
import { videosApi } from './api';
import VideoDetail from './components/video_detail/video_detail';
import styles from './App.module.css';
import Header from './components/header/header';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const popular = await videosApi.mostPopular();
      setVideos(popular.data.items);
    }

    fetchData();
  }, []);

  const videoClick = video => {
    setSelectedVideo(video);
  };

  return (
    <div className={styles.youtube}>
      <Header />
      <div className={styles.content}>
        {selectedVideo && <VideoDetail selectedVideo={selectedVideo} />}
        <VideoList videos={videos} videoClick={videoClick} selectedVideo={selectedVideo ? true : false} />
      </div>
    </div>
  );
}

export default App;
