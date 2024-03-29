import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthService from './service/auth_service';
import VideoRepository from './service/video_repository,';
import firebase from './service/firebase';
import { Provider } from 'react-redux';
import store from './store';

const authService = new AuthService(firebase);
const videoRepository = new VideoRepository(firebase);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/react-youtube">
        <App authService={authService} videoRepository={videoRepository} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
