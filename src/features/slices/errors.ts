/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { loginUser, registerUser, updateUserData } from './user';

const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    loginErrors: <Array<string>>[],
    registerErrors: <Array<string>>[],
    profileErrors: <Array<string>>[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginErrors = [];
      })
      .addCase(registerUser.pending, (state) => {
        state.registerErrors = [];
      })
      .addCase(updateUserData.pending, (state) => {
        state.profileErrors = [];
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginErrors = action.payload as string[];
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerErrors = action.payload as string[];
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.profileErrors = action.payload as string[];
      });
  },
});

const { reducer } = errorsSlice;

export default reducer;
