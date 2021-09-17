/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const errorsSlice = createSlice({
  name: 'errors',
  initialState: [],
  reducers: {
    setErrors(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = errorsSlice;

export const { setErrors } = actions;

export default reducer;
