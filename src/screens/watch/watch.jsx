import React from 'react';
import VideoDetail from '../../components/video_detail/video_detail';
import VideoList from '../../components/video_list/video_list';
import Loading from '../loading/loading';

const Watch = ({
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
        <>
          <VideoDetail
            selectedVideo={selectedVideo}
            formatDate={formatDate}
            formatNumber={formatNumber}
          />
          <VideoList
            youtube={youtube}
            videos={videos}
            selectedVideo={selectedVideo}
            clickVideo={clickVideo}
            formatDate={formatDate}
            formatNumber={formatNumber}
          />
        </>
      )}
    </>
  );
};

export default Watch;
