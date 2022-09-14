import {
  configureStore,
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import thunk from 'redux-thunk';

const videoMenuSlice = createSlice({
  name: 'videoMenu',
  initialState: { listId: null, videoId: null },
  reducers: {
    setVideoMenu: (state, action) => {
      state.listId = action.payload.listId;
      state.videoId = action.payload.videoId;
    },
  },
});

const authServiceSlice = createSlice({
  name: 'authService',
  initialState: { auth: null, user: null },
  reducers: {
    setAuthService: (state, action) => {
      state.auth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const videoRepositorySlice = createSlice({
  name: 'videoRepository',
  initialState: {
    repository: null,
    feeds: {
      history: null,
      wishList: null,
      playlist: null,
    },
  },
  reducers: {
    setvideoRepository: (state, action) => {
      state.repository = action.payload;
    },
    setUserFeeds: (state, action) => {
      state.feeds.history = action.payload.history;
      state.feeds.wishList = action.payload.wishList;
      state.feeds.playlist = action.payload.playlist;
    },
  },
});

// youtube
const httpClient = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
  },
});
const youtubeApi = httpClient;

export const mostPopular = createAsyncThunk(
  'youtube/mostPopular', //
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await youtubeApi.get('videos', {
        params: {
          part: 'snippet, statistics',
          chart: 'mostPopular',
          maxResults: 20,
          regionCode: 'KR',
        },
      });
      const items = response.data.items;

      const listData = await Promise.all(
        items.map(async video => {
          video.snippet.title = video.snippet.title.replace(
            /&#\d+;/gm, //
            s => String.fromCharCode(s.match(/\d+/gm)[0])
          );

          const channel = await (
            await dispatch(getChannel(video.snippet.channelId))
          ).payload;
          return { video, channel };
        })
      );

      return listData;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const searchResult = createAsyncThunk(
  'youtube/searchResult', //
  async (query, { dispatch }) => {
    const response = await youtubeApi.get('search', {
      params: {
        part: 'snippet',
        q: query,
        maxResults: 20,
        type: 'video',
      },
    });
    const items = response.data.items;

    const listData = await Promise.all(
      items.map(async video => {
        video.snippet.title = video.snippet.title.replace(
          /&#\d+;/gm, //
          s => String.fromCharCode(s.match(/\d+/gm)[0])
        );

        const channel = await (
          await dispatch(getChannel(video.snippet.channelId))
        ).payload;
        return { video, channel };
      })
    );

    return listData;
  }
);

export const getVideo = createAsyncThunk(
  'youtube/getVideo', //
  async (id, { dispatch }) => {
    const response = await youtubeApi.get('videos', {
      params: {
        part: 'snippet, statistics',
        id: id,
        maxResults: 1,
      },
    });
    const video = response.data.items[0];
    video.snippet.title = video.snippet.title.replace(
      /&#\d+;/gm, //
      s => String.fromCharCode(s.match(/\d+/gm)[0])
    );

    const channel = await (
      await dispatch(getChannel(video.snippet.channelId))
    ).payload;

    return { video, channel };
  }
);

export const getChannel = createAsyncThunk(
  'youtube/getChannel', //
  async id => {
    const response = await youtubeApi.get('channels', {
      params: {
        part: 'snippet, statistics',
        id: id,
        maxResults: 1,
      },
    });
    return response.data.items[0];
  }
);

const youtubeSlice = createSlice({
  name: 'youtube',
  initialState: {
    loading: true,
    detailLoading: true,
    videos: null,
    selectedVideo: null,
    searchTerm: null,
    errorCode: null,
  },
  reducers: {
    setSelectedVideo: (state, action) => {
      state.selectedVideo = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: {
    [mostPopular.pending]: state => {
      state.loading = true;
    },
    [mostPopular.rejected]: (state, action) => {
      state.errorCode = action.payload;
    },
    [mostPopular.fulfilled]: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    [searchResult.pending]: state => {
      state.loading = true;
    },
    [searchResult.fulfilled]: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    [getVideo.fulfilled]: (state, action) => {
      state.loading = false;
      state.selectedVideo = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    videoMenu: videoMenuSlice.reducer,
    authService: authServiceSlice.reducer,
    videoRepository: videoRepositorySlice.reducer,
    youtube: youtubeSlice.reducer,
  },
  middleware: [thunk],
});

export const { setVideoMenu } = videoMenuSlice.actions;
export const { setAuthService, setUser } = authServiceSlice.actions;
export const { setvideoRepository, setUserFeeds } =
  videoRepositorySlice.actions;
export const { setSelectedVideo, setSearchTerm } = youtubeSlice.actions;

export default store;
