import React, { useEffect, useState } from 'react';
import VideoDetail from '../../components/video_detail/video_detail';
import VideoList from '../../components/video_list/video_list';
import Loading from '../../components/loading/loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSelectedVideo, setVideoList } from '../../store';
import styles from './watch.module.css';

const Watch = ({ youtube }) => {
  const [loading, setLoading] = useState(true);
  const selectedVideo = useSelector(state => state.selected.data);
  const videos = useSelector(state => state.videoList.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedVideo === null) {
      const videoId = location.pathname.split('/').pop();
      youtube
        .getVideo(videoId)
        .then(data => {
          const channelId = data.snippet.channelId;

          youtube
            .getAllData(videoId, channelId) //
            .then(data =>
              dispatch(setSelectedVideo({ video: data[0], channel: data[1] }))
            )
            .catch(error =>
              navigate({
                pathname: `/error/${error.response.status}`,
              })
            );
        })
        .catch(error =>
          navigate({
            pathname: `/error/${error.response.status}`,
          })
        );
    }
    if (videos === null) {
      const searchTerm = localStorage.getItem('searchTerm');
      if (searchTerm) {
        youtube
          .search(searchTerm)
          .then(videos => dispatch(setVideoList(videos)))
          .catch(error =>
            navigate({
              pathname: `/error/${error.response.status}`,
            })
          );
      } else {
        youtube
          .mostPopular()
          .then(videos => dispatch(setVideoList(videos)))
          .catch(error =>
            navigate({
              pathname: `/error/${error.response.status}`,
            })
          );
      }
    }
  }, []);

  useEffect(() => {
    selectedVideo && videos && setLoading(false);
  }, [selectedVideo, videos]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.watch}>
          <div className={styles.container}>
            <div className={styles.video}>
              <VideoDetail selectedVideo={selectedVideo} />
            </div>
            <div className={styles.list}>
              <VideoList youtube={youtube} videos={videos} page="watch" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Watch;
