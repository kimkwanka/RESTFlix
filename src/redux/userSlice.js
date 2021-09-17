/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    token: '',
    isLoggedIn: false,
  },
  reducers: {
    updateUserData(state, action) {
      state.data = action.payload;
    },
    loginUser(state, action) {
      return {
        data: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
    },
    logoutUser(state, action) {
      return {
        data: {},
        token: '',
        isLoggedIn: false,
      };
    },
    addFavoriteMovie(state, action) {
      state.data.FavoriteMovies.push(action.payload);
    },
    removeFavoriteMovie(state, action) {
      const indexOfMovieIDToRemove = state.data.FavoriteMovies.indexOf(action.payload);
      state.data.FavoriteMovies.splice(indexOfMovieIDToRemove, 1);
    },
  },
});

const { actions, reducer } = userSlice;

export const {
  loginUser, logoutUser, addFavoriteMovie, removeFavoriteMovie, updateUserData,
} = actions;

export default reducer;
