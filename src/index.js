import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Youtube from './service/youtube';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

const httpClient = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
  },
});
const youtube = new Youtube(httpClient);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App youtube={youtube} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
