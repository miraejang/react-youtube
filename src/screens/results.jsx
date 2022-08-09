import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/loading/loading';
import VideoList from '../components/video_list/video_list';
import { setVideoList } from '../store';

const Results = ({ youtube, formatDate, formatNumber, videoRepository }) => {
  const [loading, setLoading] = useState(true);
  const term = useSelector(state => state.search.term);
  const videos = useSelector(state => state.videoList.data);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    youtube
      .search(term) //
      .then(videos => {
        dispatch(setVideoList(videos));
        setLoading(false);
      });
  }, [term]);

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
          videoRepository={videoRepository}
        />
      )}
    </>
  );
};

export default Results;
