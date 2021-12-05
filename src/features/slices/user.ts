/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

import { thunkFetch } from '@features/utils/thunkFetch';

import { TRootState } from '@features/types';

import { setAccessToken, setLoggedOut, moviesApi } from '@features/slices/api';

const API_URL = import.meta.env.VITE_MOVIE_API_URL;

interface IUserData {
  birthday: string;
  email: string;
  password: string;
  username: string;
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    { username, password }: { username: string; password: string },
    thunkAPI,
  ) =>
    thunkFetch({
      thunkAPI,
      url: `${API_URL}/login?username=${username}&password=${password}`,
      method: 'POST',
      useAuth: false,
    }),
);

export const silentRefresh = createAsyncThunk(
  'user/silentRefresh',
  async (_, thunkAPI) =>
    thunkFetch({
      thunkAPI,
      url: `${API_URL}/silentrefresh`,
      method: 'POST',
      useAuth: false,
    }),
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, thunkAPI) =>
    thunkFetch({
      thunkAPI,
      url: `${API_URL}/logout`,
      method: 'POST',
    }),
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (newUserData: IUserData, thunkAPI) =>
    thunkFetch({
      thunkAPI,
      url: `${API_URL}/users`,
      method: 'POST',
      useAuth: false,
      body: JSON.stringify(newUserData),
    }),
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (newUserData: IUserData, thunkAPI) => {
    const userId = (thunkAPI.getState() as TRootState).user.data._id;

    return thunkFetch({
      thunkAPI,
      url: `${API_URL}/users/${userId}`,
      method: 'PUT',
      body: JSON.stringify(newUserData),
    });
  },
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (_, thunkAPI) => {
    const userId = (thunkAPI.getState() as TRootState).user.data._id;

    return thunkFetch({
      thunkAPI,
      url: `${API_URL}/users/${userId}`,
      method: 'DELETE',
    });
  },
);

export const addMovieToFavorites = createAsyncThunk(
  'user/addMovieToFavorites',
  async (movieId: number, thunkAPI) => {
    const userId = (thunkAPI.getState() as TRootState).user.data._id;

    return thunkFetch({
      thunkAPI,
      url: `${API_URL}/users/${userId}/movies/${movieId}`,
      method: 'POST',
    });
  },
);

export const removeMovieFromFavorites = createAsyncThunk(
  'user/removeMovieFromFavorites',
  async (movieId: number, thunkAPI) => {
    const userId = (thunkAPI.getState() as TRootState).user.data._id;

    return thunkFetch({
      thunkAPI,
      url: `${API_URL}/users/${userId}/movies/${movieId}`,
      method: 'DELETE',
    });
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {
      _id: '',
      birthday: '',
      email: '',
      favoriteMovies: [] as number[],
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
    builder.addCase(silentRefresh.fulfilled, (state, action: AnyAction) => ({
      data: action.payload.data.user,
      token: action.payload.data.jwtToken,
      isLoggedIn: true,
    }));
    builder.addCase(silentRefresh.rejected, () => ({
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
    }));
    builder.addCase(logoutUser.fulfilled, () => ({
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
    }));
    builder.addCase(
      addMovieToFavorites.fulfilled,
      (state: IUser, action: AnyAction) => {
        state.data = action.payload.data;
      },
    );
    builder.addCase(
      removeMovieFromFavorites.fulfilled,
      (state: IUser, action: AnyAction) => {
        state.data = action.payload.data;
      },
    );
    builder.addCase(loginUser.fulfilled, (state, action: AnyAction) => ({
      data: action.payload.data.user,
      token: action.payload.data.jwtToken,
      isLoggedIn: true,
    }));
    builder.addCase(updateUserData.fulfilled, (state, action: AnyAction) => {
      state.data = action.payload.data;
    });
    builder.addCase(deleteUser.fulfilled, () => ({
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
    }));
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
  },
});

const { reducer } = userSlice;

export default reducer;
