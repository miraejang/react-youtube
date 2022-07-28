import { configureStore, createSlice } from '@reduxjs/toolkit';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: { data: null },
  reducers: {
    set: (state, action) => {
      state.data = action.payload;
    },
  },
});

const store = configureStore({ reducer: selectedSlice.reducer });

export const { set } = selectedSlice.actions;

export default store;
