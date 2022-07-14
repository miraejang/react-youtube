import React from 'react';
import VideoList from '../../components/video_list/video_list';
import Loading from '../loading/loading';

const Home = ({
  youtube,
  loading,
  videos,
  selectedVideo,
  clickVideo,
  formatDate,
  formatNumber,
}) => {
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <VideoList
          youtube={youtube}
          videos={videos}
          clickVideo={clickVideo}
          formatDate={formatDate}
          formatNumber={formatNumber}
          selectedVideo={selectedVideo}
        />
      )}
    </>
  );
};
export default Home;
