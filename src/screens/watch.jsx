import React, { useEffect, useState } from 'react';
import VideoDetail from '../components/video_detail/video_detail';
import VideoList from '../components/video_list/video_list';
import Loading from '../components/loading/loading';
import { useSelector } from 'react-redux';

const Watch = ({ youtube, formatDate, formatNumber }) => {
  const [loading, setLoading] = useState(true);
  const selectedVideo = useSelector(state => state.selected.data);
  const videos = useSelector(state => state.videoList.data);

  useEffect(() => {
    selectedVideo && videos && setLoading(false);
  }, [selectedVideo, videos]);

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
