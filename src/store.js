import { configureStore, createSlice } from '@reduxjs/toolkit';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: { data: null },
  reducers: {
    setVideo: (state, action) => {
      state.data = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { selected: selectedSlice.reducer },
});

export const { setVideo } = selectedSlice.actions;

export default store;
