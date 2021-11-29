/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

import { thunkFetch } from '@features/utils/thunkFetch';

import {
  TmdbMovieSimple,
  TmdbConfiguration,
  TRootState,
} from '@features/types';

const API_URL = import.meta.env.VITE_MOVIE_API_URL;

const fetchTMDBConfig = createAsyncThunk(
  'movies/fetchTMDBConfig',
  async (_, thunkAPI) => {
    return thunkFetch({ thunkAPI, url: `${API_URL}/tmdb/configuration` });
  },
);

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, thunkAPI) => {
    let {
      movies: { config },
    } = thunkAPI.getState() as TRootState;

    if (!config.secure_base_url) {
      await thunkAPI.dispatch(fetchTMDBConfig());
      config = (thunkAPI.getState() as TRootState).movies.config;
    }

    const { data } = await thunkFetch({
      thunkAPI,
      url: `${API_URL}/tmdb/discover/movie`,
    });

    const movies = data.results ? data.results : [];

    const moviesWithImagePaths = movies.map((movie: TmdbMovieSimple) => {
      return {
        ...movie,
        posterUrl:
          config.secure_base_url +
          config.poster_sizes[config.poster_sizes.length - 2] +
          movie.poster_path,
        backdropUrl:
          config.secure_base_url +
          config.backdrop_sizes[config.backdrop_sizes.length - 2] +
          movie.backdrop_path,
        id: movie.id.toString(),
      };
    });

    return moviesWithImagePaths;
  },
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    config: {} as TmdbConfiguration,
    entities: [] as TmdbMovieSimple[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTMDBConfig.fulfilled, (state, action: AnyAction) => {
      state.config = action.payload.data.images;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action: AnyAction) => {
      state.entities = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state) => {
      state.entities = [];
    });
  },
});

const { reducer } = moviesSlice;

export default reducer;
