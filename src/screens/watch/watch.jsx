import React from 'react';
import VideoDetail from '../../components/video_detail/video_detail';
import VideoList from '../../components/video_list/video_list';
import Loading from '../loading/loading';

const Watch = ({ youtube, loading, videos, formatDate, formatNumber }) => {
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <VideoDetail formatDate={formatDate} formatNumber={formatNumber} />
          <VideoList
            youtube={youtube}
            videos={videos}
            formatDate={formatDate}
            formatNumber={formatNumber}
            isGrid={false}
          />
        </>
      )}
    </>
  );
};

export default Watch;
