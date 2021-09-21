/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { thunkFetch } from './utils/thunkFetch';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, thunkAPI) => thunkFetch({ thunkAPI, url: 'https://dry-sands-45830.herokuapp.com/movies/' }),
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => action.payload);
  },
});

const { reducer } = moviesSlice;

export default reducer;
