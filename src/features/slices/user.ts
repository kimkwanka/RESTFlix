/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

import { thunkFetch } from '../utils/thunkFetch';

import { TRootState, IUser } from '../types';

const API_URL = process.env.MOVIE_API_URL;

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
  async (movieId: string, thunkAPI) => {
    const userId = (thunkAPI.getState() as TRootState).user.data._id;

    return thunkFetch({
      thunkAPI,
      url: `${API_URL}/users/${userId}/movies/${movieId}`,
      method: 'POST',
      meta: movieId,
    });
  },
);

export const removeMovieFromFavorites = createAsyncThunk(
  'user/removeMovieFromFavorites',
  async (movieId: string, thunkAPI) => {
    const userId = (thunkAPI.getState() as TRootState).user.data._id;

    return thunkFetch({
      thunkAPI,
      url: `${API_URL}/users/${userId}/movies/${movieId}`,
      method: 'DELETE',
      meta: movieId,
    });
  },
);

export const logoutUser = createAsyncThunk('user/logoutUser', () => {
  localStorage.removeItem('user');
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {
      _id: '',
      birthday: '',
      email: '',
      favoriteMovies: [] as string[],
      password: '',
      username: '',
    },
    token: '',
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      addMovieToFavorites.fulfilled,
      (state: IUser, action: AnyAction) => {
        state.data.favoriteMovies.push(action.meta.arg);
      },
    );
    builder.addCase(
      removeMovieFromFavorites.fulfilled,
      (state: IUser, action: AnyAction) => {
        const indexOfMovieIdToRemove = state.data.favoriteMovies.indexOf(
          action.meta.arg,
        );
        state.data.favoriteMovies.splice(indexOfMovieIdToRemove, 1);
      },
    );
    builder.addCase(loginUser.fulfilled, (state, action: AnyAction) => ({
      data: action.payload.user,
      token: action.payload.token,
      isLoggedIn: true,
    }));
    builder.addCase(updateUserData.fulfilled, (state, action: AnyAction) => {
      state.data = action.payload;
    });
    builder.addCase(deleteUser.fulfilled, () => ({
      data: {
        _id: '',
        birthday: '',
        email: '',
        favoriteMovies: [],
        password: '',
        username: '',
      },
      token: '',
      isLoggedIn: false,
    }));
    builder.addCase(logoutUser.pending, () => ({
      data: {
        _id: '',
        birthday: '',
        email: '',
        favoriteMovies: [],
        password: '',
        username: '',
      },
      token: '',
      isLoggedIn: false,
    }));
  },
});

const { reducer } = userSlice;

export default reducer;
