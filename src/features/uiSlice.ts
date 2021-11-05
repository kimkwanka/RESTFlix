/* eslint-disable no-param-reassign */
import { createSlice, AnyAction } from '@reduxjs/toolkit';

const isPendingAction = (action: AnyAction) => action.type.endsWith('/pending');
const isFullfilledOrRejectedAction = (action: AnyAction) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected');

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isRequestPending: false,
    searchTerm: '',
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction, (state, _) => {
        state.isRequestPending = true;
      })
      .addMatcher(isFullfilledOrRejectedAction, (state, _) => {
        state.isRequestPending = false;
      });
  },
});

const { actions, reducer } = uiSlice;

export const { setSearchTerm } = actions;

export default reducer;
