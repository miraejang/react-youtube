import { configureStore, createSlice } from '@reduxjs/toolkit';

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

const store = configureStore({
  reducer: {
    selected: selectedSlice.reducer,
    search: searchSlice.reducer,
    videoList: videoListSlice.reducer,
    user: userSlice.reducer,
    userFeeds: userFeedsSlice.reducer,
  },
});

export const { setSelectedVideo } = selectedSlice.actions;
export const { setSearchTerm } = searchSlice.actions;
export const { setVideoList } = videoListSlice.actions;
export const { setUser } = userSlice.actions;
export const { setUserFeeds } = userFeedsSlice.actions;

export default store;
