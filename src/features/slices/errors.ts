/* eslint-disable no-param-reassign */
import { createSlice, AnyAction } from '@reduxjs/toolkit';

import { loginUser, registerUser, updateUserData } from './user';

const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    loginErrors: <Array<{ message: string }>>[],
    registerErrors: <Array<{ message: string }>>[],
    profileErrors: <Array<{ message: string }>>[],
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
      .addCase(loginUser.rejected, (state, action: AnyAction) => {
        state.loginErrors = action.payload.errors;
      })
      .addCase(registerUser.rejected, (state, action: AnyAction) => {
        state.registerErrors = action.payload.errors;
      })
      .addCase(updateUserData.rejected, (state, action: AnyAction) => {
        state.profileErrors = action.payload.errors;
      });
  },
});

const { reducer } = errorsSlice;

export default reducer;
