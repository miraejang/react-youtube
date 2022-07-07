class Youtube {
  constructor(httpClient) {
    this.youtube = httpClient;
  }

  async getVideo(id) {
    const response = await this.youtube.get('videos', {
      params: {
        part: 'snippet, statistics',
        id: id,
        maxResults: 1,
      },
    });
    return response.data.items[0];
  }

  async mostPopular() {
    const response = await this.youtube.get('videos', {
      params: {
        part: 'snippet, statistics',
        chart: 'mostPopular',
        maxResults: 20,
      },
    });
    return response.data.items;
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
    return response.data.items;
  }

  async getChannel(id) {
    const response = await this.youtube.get('channels', {
      params: {
        part: 'snippet, statistics',
        id: id,
        maxResults: 1,
      },
    });
    return response.data.items[0];
  }
}

export default Youtube;
