/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { thunkFetch } from './utils/thunkFetch';

const API_URL = process.env.MOVIE_API_URL;

if (!API_URL) {
  throw new Error('Environment variable MOVIE_API_URL is not set. Either provide it via a .env file or natively in your OS.');
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, thunkAPI) => thunkFetch({ thunkAPI, url: `${API_URL}/movies/` }),
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
