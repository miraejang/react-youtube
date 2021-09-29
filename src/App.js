import VideoList from './components/video_list/video_list';
import { useEffect, useState } from 'react';
import { videosApi } from './api';
import VideoDetail from './components/video_detail/video_detail';
import styles from './App.module.css';

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
    <>
      <h1>Youtube</h1>
      <div className={styles.content}>
        {selectedVideo && <VideoDetail selectedVideo={selectedVideo} />}
        <VideoList videos={videos} videoClick={videoClick} selectedVideo={selectedVideo ? true : false} />
      </div>
    </>
  );
}

export default App;
