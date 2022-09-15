import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/loading/loading';
import VideoList from '../components/video_list/video_list';
import { searchResult } from '../store';

const Results = () => {
  const { loading, videos, searchTerm } = useSelector(state => state.youtube);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchResult(searchTerm));
  }, [searchTerm, dispatch]);

  return (
    <>{loading ? <Loading /> : <VideoList videos={videos} page="results" />}</>
  );
};

export default Results;
