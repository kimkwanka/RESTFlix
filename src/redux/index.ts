import { combineReducers } from 'redux';

import userReducer from './userSlice';
import uiReducer from './uiSlice';
import errorsReducer from './errorsSlice';
import moviesReducer from './moviesSlice';

export default combineReducers({
  user: userReducer,
  ui: uiReducer,
  errors: errorsReducer,
  movies: moviesReducer,
});

export * from './userSlice';
export * from './uiSlice';
export * from './errorsSlice';
export * from './moviesSlice';
