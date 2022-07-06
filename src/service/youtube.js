class Youtube {
  constructor(httpClient) {
    this.youtube = httpClient;
  }

  async videos(id) {
    const response = await this.youtube.get('videos', {
      params: {
        part: 'snippet, statistics',
        id: id,
        maxResults: 1,
      },
    });
    return response;
  }

  async mostPopular() {
    const response = await this.youtube.get('videos', {
      params: {
        part: 'snippet, statistics',
        chart: 'mostPopular',
        maxResults: 20,
      },
    });
    return response;
  }

  async search(query) {
    const response = await this.youtube.get('search', {
      params: {
        part: 'snippet',
        q: query,
        maxResults: 20,
        type: 'video',
      },
    });
    return response;
  }

  async channels(id) {
    const response = await this.youtube.get('channels', {
      params: {
        part: 'snippet, statistics',
        id: id,
        maxResults: 1,
      },
    });
    return response;
  }
}

export default Youtube;
