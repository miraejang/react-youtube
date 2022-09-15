import React, { useEffect } from 'react';
import VideoList from '../../components/video_list/video_list';
import Loading from '../../components/loading/loading';
import { useDispatch, useSelector } from 'react-redux';
import { mostPopular } from '../../store';

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.youtube.loading);
  const videos = useSelector(state => state.youtube.videos);

  useEffect(() => {
    localStorage.setItem('searchTerm', '');
    dispatch(mostPopular());
  }, [dispatch]);

  return (
    <>{loading ? <Loading /> : <VideoList videos={videos} page="home" />}</>
  );
};
export default Home;
