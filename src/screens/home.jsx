import React, { useEffect, useState } from 'react';
import VideoList from '../components/video_list/video_list';
import Loading from '../components/loading/loading';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoList } from '../store';

const Home = ({ youtube, formatDate, formatNumber }) => {
  const [loading, setLoading] = useState(true);
  const videos = useSelector(state => state.videoList.data);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('searchTerm', '');
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
          formatDate={formatDate}
          formatNumber={formatNumber}
          isGrid={true}
        />
      )}
    </>
  );
};
export default Home;