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

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

const userFeedsSlice = createSlice({
  name: 'userFeeds',
  initialState: {
    history: null,
    wishList: null,
    playlist: null,
  },
  reducers: {
    setUserFeeds: (state, action) => {
      state.history = action.payload.history;
      state.wishList = action.payload.wishList;
      state.playlist = action.payload.playlist;
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
  name: 'auth',
  initialState: { data: null },
  reducers: {
    setAuthService: (state, action) => {
      state.data = action.payload;
    },
  },
});

const videoRepositorySlice = createSlice({
  name: 'videoRepository',
  initialState: { data: null },
  reducers: {
    setvideoRepository: (state, action) => {
      state.data = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    selected: selectedSlice.reducer,
    search: searchSlice.reducer,
    videoList: videoListSlice.reducer,
    user: userSlice.reducer,
    userFeeds: userFeedsSlice.reducer,
    videoMenu: videoMenuSlice.reducer,
    auth: authServiceSlice.reducer,
    videoRepo: videoRepositorySlice.reducer,
  },
  middleware: [thunk],
});

export const { setSelectedVideo } = selectedSlice.actions;
export const { setSearchTerm } = searchSlice.actions;
export const { setVideoList } = videoListSlice.actions;
export const { setUser } = userSlice.actions;
export const { setUserFeeds } = userFeedsSlice.actions;
export const { setVideoMenu } = videoMenuSlice.actions;
export const { setAuthService } = authServiceSlice.actions;
export const { setvideoRepository } = videoRepositorySlice.actions;

export default store;
