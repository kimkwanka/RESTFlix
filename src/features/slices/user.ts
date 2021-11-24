/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

import { thunkFetch } from '@features/utils/thunkFetch';

import { TRootState, IUser } from '@features/types';

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

export const loginUserSilently = createAsyncThunk(
  'user/loginUserSilently',
  async (_, thunkAPI) =>
    thunkFetch({
      thunkAPI,
      url: `${API_URL}/silentlogin`,
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
      useAuth: false,
    }),
);

export const getNewTokens = createAsyncThunk(
  'user/getNewTokens',
  async (_, thunkAPI) =>
    thunkFetch({
      thunkAPI,
      url: `${API_URL}/tokenrefresh`,
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
      favoriteMovies: [] as string[],
      passwordHash: '',
      username: '',
    },
    token: '',
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewTokens.fulfilled, (state, action: AnyAction) => {
      state.token = action.payload.data.jwtToken;
    });
    builder.addCase(getNewTokens.rejected, () => ({
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
      isRefreshing: false,
    }));
    builder.addCase(
      loginUserSilently.fulfilled,
      (state, action: AnyAction) => ({
        data: action.payload.data.user,
        token: action.payload.data.jwtToken,
        isLoggedIn: true,
      }),
    );
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
    builder.addCase(logoutUser.pending, () => ({
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
  },
});

const { reducer } = userSlice;

export default reducer;
