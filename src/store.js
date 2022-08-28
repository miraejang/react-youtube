import { configureStore, createSlice } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const videoListSlice = createSlice({
  name: 'videoList',
  initialState: { data: null },
  reducers: {
    setVideoList: (state, action) => {
      state.data = action.payload;
    },
  },
});

const selectedSlice = createSlice({
  name: 'selected',
  initialState: { data: null },
  reducers: {
    setSelectedVideo: (state, action) => {
      state.data = action.payload;
    },
  },
});

const searchSlice = createSlice({
  name: 'search',
  initialState: { term: null },
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload;
    },
  },
});

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

const store = configureStore({
  reducer: {
    selected: selectedSlice.reducer,
    search: searchSlice.reducer,
    videoList: videoListSlice.reducer,
    videoMenu: videoMenuSlice.reducer,
    authService: authServiceSlice.reducer,
    videoRepository: videoRepositorySlice.reducer,
  },
  middleware: [thunk],
});

export const { setSelectedVideo } = selectedSlice.actions;
export const { setSearchTerm } = searchSlice.actions;
export const { setVideoList } = videoListSlice.actions;
export const { setVideoMenu } = videoMenuSlice.actions;
export const { setAuthService, setUser } = authServiceSlice.actions;
export const { setvideoRepository, setUserFeeds } =
  videoRepositorySlice.actions;

export default store;
