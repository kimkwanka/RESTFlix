import { combineReducers } from 'redux';

import { moviesApi } from '@features/slices/api';

import userReducer from './slices/user';
import uiReducer from './slices/ui';
import errorsReducer from './slices/errors';
import moviesReducer from './slices/movies';

export default combineReducers({
  user: userReducer,
  ui: uiReducer,
  errors: errorsReducer,
  movies: moviesReducer,
  [moviesApi.reducerPath]: moviesApi.reducer,
});
