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

  async mostPopular() {
    const response = await this.youtube.get('videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 20,
      },
    });
    return response;
  }

  async search(term) {
    const response = this.youtube.get('search', {
      params: {
        part: 'snippet',
        q: term,
        maxResults: 20,
        type: 'video',
      },
    });
    return response;
  }
}

export default Youtube;
