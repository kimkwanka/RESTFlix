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

const fetchGenres = createAsyncThunk(
  'movies/fetchGenres',
  async (_, thunkAPI) => {
    return thunkFetch({ thunkAPI, url: `${API_URL}/tmdb/genre/movie/list` });
  },
);

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, thunkAPI) => {
    let {
      movies: { config, genres },
    } = thunkAPI.getState() as TRootState;

    if (!config.secure_base_url) {
      await thunkAPI.dispatch(fetchTMDBConfig());
      config = (thunkAPI.getState() as TRootState).movies.config;
    }

    if (!Object.keys(genres).length) {
      await thunkAPI.dispatch(fetchGenres());
      genres = (thunkAPI.getState() as TRootState).movies.genres;
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
        genres: movie.genre_ids.map((id) => genres[id]),
      };
    });

    return moviesWithImagePaths;
  },
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    config: {} as TmdbConfiguration,
    genres: {} as Record<number, string>,
    entities: [] as TmdbMovieSimple[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTMDBConfig.fulfilled, (state, action: AnyAction) => {
      state.config = action.payload.data.images;
    });
    builder.addCase(fetchGenres.fulfilled, (state, action: AnyAction) => {
      const genreLookupTable: Record<number, string> = {};
      action.payload.data.genres.forEach(
        (genre: { id: number; name: string }) => {
          genreLookupTable[genre.id] = genre.name;
        },
      );
      state.genres = genreLookupTable;
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
