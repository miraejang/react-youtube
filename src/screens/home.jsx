import React from 'react';
import VideoList from '../components/video_list/video_list';
import Loading from '../components/loading/loading';

const Home = ({
  youtube,
  loading,
  videos,
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
          isGrid={true}
        />
      )}
    </>
  );
};
export default Home;
