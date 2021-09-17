/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    isRequestPending: false,
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

const pendingRequestReducer = (state = false, action) => {
  const actionTypeStr = action.type.toString();

  if (actionTypeStr.endsWith('/pending')) {
    return true;
  }
  if (actionTypeStr.endsWith('/fulfilled')) {
    return false;
  }
  return state;
};

const { actions, reducer: uiSliceReducer } = uiSlice;

export const { setIsLoading, setVisibilityFilter } = actions;

const combinedUIReducer = (state = {
  isLoading: false,
  isRequestPending: false,
  visibilityFilter: '',
}, action) => {
  const nextState = uiSliceReducer(state, action);
  const isRequestPending = pendingRequestReducer(state.isRequestPending, action);

  return { ...nextState, isRequestPending };
};

export default combinedUIReducer;
