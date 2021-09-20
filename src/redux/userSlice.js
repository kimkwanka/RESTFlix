/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addMovieToFavorites = createAsyncThunk(
  'user/addMovieToFavorites',
  async (movieID, { getState, rejectWithValue }) => {
    const jwtToken = getState().user.token;
    const userID = getState().user.data._id;

    try {
      const response = await fetch(
        `https://dry-sands-45830.herokuapp.com/users/${userID}/movies/${movieID}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      if (response.status === 200) {
        return movieID;
      }
      const addFavoriteError = await response.text();

      console.error(addFavoriteError);
      return rejectWithValue(addFavoriteError);
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.toString());
    }
  },
);

export const removeMovieFromFavorites = createAsyncThunk(
  'user/removeMovieFromFavorites',
  async (movieID, { getState, rejectWithValue }) => {
    const jwtToken = getState().user.token;
    const userID = getState().user.data._id;

    try {
      const response = await fetch(
        `https://dry-sands-45830.herokuapp.com/users/${userID}/movies/${movieID}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      if (response.status === 200) {
        return movieID;
      }
      const addFavoriteError = await response.text();

      console.error(addFavoriteError);
      return rejectWithValue(addFavoriteError);
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.toString());
    }
  },
);

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
    logoutUser() {
      return {
        data: {},
        token: '',
        isLoggedIn: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMovieToFavorites.fulfilled,
      (state, action) => {
        state.data.FavoriteMovies.push(action.payload);
      });
    builder.addCase(removeMovieFromFavorites.fulfilled,
      (state, action) => {
        const indexOfMovieIDToRemove = state.data.FavoriteMovies.indexOf(
          action.payload,
        );
        state.data.FavoriteMovies.splice(indexOfMovieIDToRemove, 1);
      });
  },
});

const { actions, reducer } = userSlice;

export const {
  loginUser,
  logoutUser,
  updateUserData,
} = actions;

export default reducer;
