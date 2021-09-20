/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { getState, rejectWithValue }) => {
    const { movies } = getState();

    if (movies.length > 0) {
      return movies;
    }

    const jwtToken = getState().user.token;

    try {
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
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.toString());
    }
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
