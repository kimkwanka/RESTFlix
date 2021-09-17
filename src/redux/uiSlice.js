/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    visibilityFilter: '',
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setVisibilityFilter(state, action) {
      state.visibilityFilter = action.payload;
    },
  },
});

const { actions, reducer } = uiSlice;

export const { setIsLoading, setVisibilityFilter } = actions;

export default reducer;
