/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

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
});

const pendingRequestReducer = (state = false, action) => {
  const actionTypeStr = action.type.toString();

  if (actionTypeStr.endsWith('/pending')) {
    return true;
  }

  if (
    actionTypeStr.endsWith('/fulfilled')
    || actionTypeStr.endsWith('/rejected')
  ) {
    return false;
  }

  return state;
};

const { actions, reducer: uiSliceReducer } = uiSlice;

export const { setSearchTerm } = actions;

const combinedUIReducer = (
  state = {
    isRequestPending: false,
    searchTerm: '',
  },
  action,
) => {
  const nextState = uiSliceReducer(state, action);
  const isRequestPending = pendingRequestReducer(
    state.isRequestPending,
    action,
  );

  return { ...nextState, isRequestPending };
};

export default combinedUIReducer;
