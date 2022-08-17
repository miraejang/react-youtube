import React, { useEffect, useState } from 'react';
import VideoDetail from '../components/video_detail/video_detail';
import VideoList from '../components/video_list/video_list';
import Loading from '../components/loading/loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setSelectedVideo, setVideoList } from '../store';

const Watch = ({ youtube, formatDate, formatNumber, videoRepository }) => {
  const [loading, setLoading] = useState(true);
  const selectedVideo = useSelector(state => state.selected.data);
  const videos = useSelector(state => state.videoList.data);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (selectedVideo === null) {
      const videoId = location.pathname.split('/').pop();
      youtube.getVideo(videoId).then(data => {
        const channelId = data.snippet.channelId;

        youtube
          .getAllData(videoId, channelId) //
          .then(data =>
            dispatch(setSelectedVideo({ video: data[0], channel: data[1] }))
          );
      });
    }
    if (videos === null) {
      const searchTerm = localStorage.getItem('searchTerm');
      if (searchTerm) {
        youtube
          .search(searchTerm)
          .then(videos => dispatch(setVideoList(videos)));
      } else {
        youtube.mostPopular().then(videos => dispatch(setVideoList(videos)));
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
        <>
          <VideoDetail
            selectedVideo={selectedVideo}
            formatDate={formatDate}
            formatNumber={formatNumber}
            videoRepository={videoRepository}
          />
          <VideoList
            youtube={youtube}
            videos={videos}
            formatDate={formatDate}
            formatNumber={formatNumber}
            isGrid={false}
            videoRepository={videoRepository}
          />
        </>
      )}
    </>
  );
};

export default Watch;
