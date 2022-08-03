import React, { useEffect, useState } from 'react';
import VideoList from '../components/video_list/video_list';
import Loading from '../components/loading/loading';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoList } from '../store';

const Home = ({ youtube, clickVideo, formatDate, formatNumber }) => {
  const [loading, setLoading] = useState(true);
  const videos = useSelector(state => state.videoList.data);
  const dispatch = useDispatch();

  useEffect(() => {
    youtube.mostPopular().then(videos => {
      dispatch(setVideoList(videos));
      setLoading(false);
    });
  }, []);

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
