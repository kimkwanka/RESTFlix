/* eslint-disable no-param-reassign */
import { createSlice, AnyAction } from '@reduxjs/toolkit';

const isPendingAction = (action: AnyAction) => action.type.endsWith('/pending');
const isFullfilledOrRejectedAction = (action: AnyAction) =>
  action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected');

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isRequestPending: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction, (state) => {
        state.isRequestPending = true;
      })
      .addMatcher(isFullfilledOrRejectedAction, (state) => {
        state.isRequestPending = false;
      });
  },
});

const { reducer } = uiSlice;

export default reducer;
