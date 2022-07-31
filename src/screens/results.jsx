import React from 'react';
import Loading from '../components/loading/loading';
import VideoList from '../components/video_list/video_list';

const Results = ({ youtube, loading, videos, formatDate, formatNumber }) => {
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <VideoList
          youtube={youtube}
          videos={videos}
          formatDate={formatDate}
          formatNumber={formatNumber}
          isGrid={false}
        />
      )}
    </>
  );
};

export default Results;
