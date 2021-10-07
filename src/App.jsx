import VideoList from './components/video_list/video_list';
import { useEffect, useState } from 'react';
import VideoDetail from './components/video_detail/video_detail';
import styles from './app.module.css';
import Header from './components/header/header';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [channelInfo, setChannelInfo] = useState(null);

  useEffect(() => {
    youtube
      .mostPopular() //
      .then(videos => setVideos(videos.data.items));
  }, [youtube]);

  const videoClick = video => {
    channel(video.snippet.channelId);
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

  const searchVideo = async query => {
    youtube
      .search(query) //
      .then(videos => setVideos(videos.data.items));
  };

  const channel = async id => {
    youtube
      .channels(id) //
      .then(channel => setChannelInfo(channel.data.items[0]));
  };

  return (
    <div className={styles.youtube}>
      <Header searchTerm={searchTerm} searchSubmit={searchSubmit} valueChange={valueChange} />
      <div className={styles.content}>
        {selectedVideo && <VideoDetail selectedVideo={selectedVideo} channelInfo={channelInfo} />}
        <VideoList videos={videos} videoClick={videoClick} selectedVideo={selectedVideo ? true : false} />
      </div>
    </div>
  );
}

export default App;
