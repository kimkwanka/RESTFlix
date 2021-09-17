/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {
    setMovies(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = moviesSlice;

export const { setMovies } = actions;

export default reducer;
