import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../components/loading/loading';
import VideoList from '../components/video_list/video_list';
import { searchResult } from '../store';

const Results = () => {
  const { search } = useLocation();
  const { loading, videos, searchTerm } = useSelector(state => state.youtube);
  const dispatch = useDispatch();

  useEffect(() => {
    if (videos === null) {
    }
    dispatch(searchResult(searchTerm));
  }, [searchTerm]);

  return (
    <>{loading ? <Loading /> : <VideoList videos={videos} page="results" />}</>
  );
};

export default Results;
