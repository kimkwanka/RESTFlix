/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { thunkFetch } from './utils/thunkFetch';

const API_URL = process.env.MOVIE_API_URL;

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }, thunkAPI) => thunkFetch({
    thunkAPI,
    url: `${API_URL}/login?username=${username}&password=${password}`,
    method: 'POST',
    useAuth: false,
  }),
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (newUserData, thunkAPI) => thunkFetch({
    thunkAPI,
    url: `${API_URL}/users`,
    method: 'POST',
    useAuth: false,
    body: JSON.stringify(newUserData),
  }),
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (newUserData, thunkAPI) => {
    const userID = thunkAPI.getState().user.data._id;

    return thunkFetch({
      thunkAPI,
      url: `${API_URL}/users/${userID}`,
      method: 'PUT',
      body: JSON.stringify(newUserData),
    });
  },
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (_, thunkAPI) => {
    const userID = thunkAPI.getState().user.data._id;

    return thunkFetch({
      thunkAPI,
      url: `${API_URL}/users/${userID}`,
      method: 'DELETE',
    });
  },
);

export const addMovieToFavorites = createAsyncThunk(
  'user/addMovieToFavorites',
  async (movieID, thunkAPI) => {
    const userID = thunkAPI.getState().user.data._id;

    return thunkFetch({
      thunkAPI,
      url: `${API_URL}/users/${userID}/movies/${movieID}`,
      method: 'POST',
      meta: movieID,
    });
  },
);

export const removeMovieFromFavorites = createAsyncThunk(
  'user/removeMovieFromFavorites',
  async (movieID, thunkAPI) => {
    const userID = thunkAPI.getState().user.data._id;

    return thunkFetch({
      thunkAPI,
      url: `${API_URL}/users/${userID}/movies/${movieID}`,
      method: 'DELETE',
      meta: movieID,
    });
  },
);

export const logoutUser = createAsyncThunk('user/logoutUser', (_) => {
  localStorage.removeItem('user');
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    token: '',
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addMovieToFavorites.fulfilled, (state, action) => {
      state.data.favoriteMovies.push(action.meta.arg);
    });
    builder.addCase(removeMovieFromFavorites.fulfilled, (state, action) => {
      const indexOfMovieIDToRemove = state.data.favoriteMovies.indexOf(
        action.meta.arg,
      );
      state.data.favoriteMovies.splice(indexOfMovieIDToRemove, 1);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => ({
      data: action.payload.user,
      token: action.payload.token,
      isLoggedIn: true,
    }));
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(deleteUser.fulfilled, (_, __) => ({
      data: {},
      token: '',
      isLoggedIn: false,
    }));
    builder.addCase(logoutUser.pending, (_, __) => ({
      data: {},
      token: '',
      isLoggedIn: false,
    }));
  },
});

const { reducer } = userSlice;

export default reducer;
