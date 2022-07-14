import React from 'react';
import Nav from '../nav/nav';
import VideoDetail from '../video_detail/video_detail';
import VideoList from '../video_list/video_list';
import styles from './content.module.css';

const Content = ({
  youtube,
  videos,
  selectedVideo,
  formatDate,
  formatNumber,
  clickVideo,
  onClickMenu,
}) => {
  return (
    <div className={styles.content}>
      <Nav selectedVideo={selectedVideo} onClickMenu={onClickMenu} />
      {selectedVideo && (
        <VideoDetail
          selectedVideo={selectedVideo}
          formatDate={formatDate}
          formatNumber={formatNumber}
        />
      )}
      <VideoList
        youtube={youtube}
        videos={videos}
        clickVideo={clickVideo}
        formatDate={formatDate}
        formatNumber={formatNumber}
        selectedVideo={selectedVideo ? true : false}
      />
    </div>
  );
};

export default Content;
