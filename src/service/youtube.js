import axios from 'axios';

class Youtube {
  constructor(key) {
    this.youtube = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3/',
      params: {
        key: key,
      },
    });
  }
}

export const videosApi = {
  mostPopular: () =>
    this.youtube.get('videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 20,
      },
    }),
};

export const searchApi = {
  search: term =>
    this.youtube.get('search', {
      params: {
        part: 'snippet',
        q: term,
        maxResults: 20,
        type: 'video',
      },
    }),
};

export default Youtube;
