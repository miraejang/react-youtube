import React from 'react';

function VideoItem({ video, video: { snippet } }) {
  return (
    <li key={video.id}>
      <img src={snippet.thumbnails.high.url} alt={`${snippet.title} thumbnail`} />
      <h4>{snippet.title}</h4>
      <p>{video.channelTitle}</p>
    </li>
  );
}

export default VideoItem;
