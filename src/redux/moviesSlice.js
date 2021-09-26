/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { thunkFetch } from './utils/thunkFetch';

const API_URL = process.env.MOVIE_API_URL;

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, thunkAPI) => {
    const { movies } = thunkAPI.getState();

    if (movies.length > 0) {
      return movies;
    }

    return thunkFetch({ thunkAPI, url: `${API_URL}/movies/` });
  },
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
