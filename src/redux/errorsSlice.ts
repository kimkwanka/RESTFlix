/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { loginUser, registerUser, updateUserData } from './userSlice';

const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    loginErrors: [],
    registerErrors: [],
    profileErrors: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, _) => {
        state.loginErrors = [];
      })
      .addCase(registerUser.pending, (state, _) => {
        state.registerErrors = [];
      })
      .addCase(updateUserData.pending, (state, _) => {
        state.profileErrors = [];
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginErrors = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerErrors = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.profileErrors = action.payload;
      });
  },
});

const { actions, reducer } = errorsSlice;

export const { setErrors } = actions;

export default reducer;
