import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Youtube from './service/youtube';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import AuthService from './service/auth_service';
import firebase from './service/firebase';
import { Provider } from 'react-redux';
import store from './store';

const authService = new AuthService(firebase);
const httpClient = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
  },
});
const youtube = new Youtube(httpClient);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/react-youtube">
        <App youtube={youtube} authService={authService} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
