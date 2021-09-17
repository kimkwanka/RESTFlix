/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { getState }) => {
    const { movies } = getState();

    if (movies.length > 0) {
      return movies;
    }

    const jwtToken = getState().user.token;
    const response = await fetch(
      'https://dry-sands-45830.herokuapp.com/movies/',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );

    const fetchedMovies = response.json();
    return fetchedMovies;
  },
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {
    setMovies(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => action.payload);
  },
});

const { actions, reducer } = moviesSlice;

export const { setMovies } = actions;

export default reducer;
