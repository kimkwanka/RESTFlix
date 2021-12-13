/* eslint-disable no-param-reassign */
import { createSlice, AnyAction } from '@reduxjs/toolkit';

import moviesApi, { setAccessToken, setLoggedOut } from '#state/slices/api';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {
      _id: '',
      birthday: '',
      email: '',
      favoriteMovies: [] as string[],
      passwordHash: '',
      username: '',
    },
    token: '',
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAccessToken, (state, action: AnyAction) => {
      state.token = action.payload;
    });
    builder.addCase(setLoggedOut, () => {
      return {
        data: {
          _id: '',
          birthday: '',
          email: '',
          favoriteMovies: [],
          passwordHash: '',
          username: '',
        },
        token: '',
        isLoggedIn: false,
      };
    });
    builder.addMatcher(
      moviesApi.endpoints.loginUser.matchFulfilled,
      (_, action) => {
        const { user, jwtToken } = action.payload;
        return { data: user, token: jwtToken, isLoggedIn: true };
      },
    );
    builder.addMatcher(
      moviesApi.endpoints.silentLogin.matchFulfilled,
      (_, action) => {
        const { user, jwtToken } = action.payload;
        return { data: user, token: jwtToken, isLoggedIn: true };
      },
    );
    builder.addMatcher(moviesApi.endpoints.logoutUser.matchFulfilled, () => {
      return {
        data: {
          _id: '',
          birthday: '',
          email: '',
          favoriteMovies: [],
          passwordHash: '',
          username: '',
        },
        token: '',
        isLoggedIn: false,
      };
    });
    builder.addMatcher(
      moviesApi.endpoints.updateUser.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
      },
    );
    builder.addMatcher(moviesApi.endpoints.deleteUser.matchFulfilled, () => {
      return {
        data: {
          _id: '',
          birthday: '',
          email: '',
          favoriteMovies: [],
          passwordHash: '',
          username: '',
        },
        token: '',
        isLoggedIn: false,
      };
    });
    builder.addMatcher(
      moviesApi.endpoints.addMovieToFavorites.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
      },
    );
    builder.addMatcher(
      moviesApi.endpoints.removeMovieFromFavorites.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
      },
    );
  },
});

const { reducer } = userSlice;

export default reducer;
