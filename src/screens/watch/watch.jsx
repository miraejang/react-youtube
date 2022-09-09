import React, { useEffect } from 'react';
import VideoDetail from '../../components/video_detail/video_detail';
import VideoList from '../../components/video_list/video_list';
import Loading from '../../components/loading/loading';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideo, mostPopular, searchResult } from '../../store';
import styles from './watch.module.css';

const Watch = () => {
  const { id } = useParams();
  const { loading, detailLoading, videos, selectedVideo } = useSelector(
    state => state.youtube
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // selected video
    if (selectedVideo === null) {
      dispatch(getVideo(id));
    }
    // videos
    if (videos === null) {
      const searchTerm = localStorage.getItem('searchTerm');
      searchTerm ? dispatch(searchResult(searchTerm)) : dispatch(mostPopular());
    }
  }, [id]);

  return (
    <>
      {loading && detailLoading ? (
        <Loading />
      ) : (
        <div className={styles.watch}>
          <div className={styles.container}>
            <div className={styles.video}>
              <VideoDetail selectedVideo={selectedVideo} />
            </div>
            <div className={styles.list}>
              <VideoList videos={videos} page="watch" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Watch;
