/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://dry-sands-45830.herokuapp.com/login?Username=${username}&Password=${password}`,
        {
          method: 'POST',
          headers: {},
        },
      );

      if (response.status === 200) {
        const { user, token } = await response.json();

        return { user, token };
      }

      const loginErrors = [await response.text()];
      console.error(loginErrors);

      return rejectWithValue(loginErrors);
    } catch (err) {
      console.error(err);
      return rejectWithValue([err.toString()]);
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (newUserData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://dry-sands-45830.herokuapp.com/users',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUserData),
        },
      );

      if (response.status === 201) {
        const createdUser = await response.json();

        return createdUser;
      }

      const isResponseText = response.headers.get('Content-Type').startsWith('text');

      const registerErrors = isResponseText
        ? [await response.text()]
        : response.json().errors.map((e) => e.msg);

      console.error(registerErrors);
      return rejectWithValue(registerErrors);
    } catch (err) {
      console.error(err);
      return rejectWithValue([err.toString()]);
    }
  },
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (newUserData, { rejectWithValue, getState }) => {
    try {
      const jwtToken = getState().user.token;
      const userID = getState().user.data._id;

      const response = await fetch(
        `https://dry-sands-45830.herokuapp.com/users/${userID}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(newUserData),
        },
      );

      if (response.status === 200) {
        const updatedUser = await response.json();

        return updatedUser;
      }

      const isResponseText = response.headers.get('Content-Type').startsWith('text');

      const profileErrors = isResponseText
        ? [await response.text()]
        : response.json().errors.map((e) => e.msg);

      console.error(profileErrors);

      return rejectWithValue(profileErrors);
    } catch (err) {
      console.error(err);
      return rejectWithValue([err.toString()]);
    }
  },
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const jwtToken = getState().user.token;
      const userID = getState().user.data._id;

      const response = await fetch(
        `https://dry-sands-45830.herokuapp.com/users/${userID}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      if (response.status === 200) {
        const deletionMsg = await response.text();

        localStorage.removeItem('user');

        return deletionMsg;
      }

      const profileErrors = [await response.text()];
      console.error(profileErrors);

      return rejectWithValue(profileErrors);
    } catch (err) {
      console.error(err);
      return rejectWithValue([err.toString()]);
    }
  },
);

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

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_) => {
    localStorage.removeItem('user');
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    token: '',
    isLoggedIn: false,
  },
  reducers: {},
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
    builder.addCase(loginUser.fulfilled,
      (state, action) => ({
        data: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      }));
    builder.addCase(updateUserData.fulfilled,
      (state, action) => {
        state.data = action.payload;
      });
    builder.addCase(deleteUser.fulfilled,
      (_, __) => ({
        data: {},
        token: '',
        isLoggedIn: false,
      }));
    builder.addCase(logoutUser.pending,
      (_, __) => ({
        data: {},
        token: '',
        isLoggedIn: false,
      }));
  },
});

const { reducer } = userSlice;

export default reducer;
