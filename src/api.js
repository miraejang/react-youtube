import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    key: 'AIzaSyC5GGuLb7zimO73RnKUXjzSezHuy1ZkmIc',
  },
});

export const videosApi = {
  mostPopular: () =>
    api.get('videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 20,
      },
    }),
};

export const searchApi = {
  search: term =>
    api.get('search', {
      params: {
        part: 'snippet',
        q: term,
        maxResults: 20,
        type: 'video',
      },
    }),
};
