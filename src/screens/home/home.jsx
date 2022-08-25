import React, { useEffect, useState } from 'react';
import VideoList from '../../components/video_list/video_list';
import Loading from '../../components/loading/loading';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoList } from '../../store';
import { useNavigate } from 'react-router-dom';

const Home = ({ youtube, videoRepository }) => {
  const [loading, setLoading] = useState(true);
  const videos = useSelector(state => state.videoList.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('searchTerm', '');
    youtube
      .mostPopular()
      .then(videos => {
        dispatch(setVideoList(videos));
        setLoading(false);
      })
      .catch(error =>
        navigate({
          pathname: `/error/${error.response.status}`,
        })
      );
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <VideoList
          youtube={youtube}
          videos={videos}
          page="home"
          videoRepository={videoRepository}
        />
      )}
    </>
  );
};
export default Home;
