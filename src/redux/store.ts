import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from 'redux';

import api from '#redux/slices/api';

import userReducer from './slices/user';
import uiReducer from './slices/ui';

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  [api.reducerPath]: api.reducer,
});

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof rootReducer>;

export default store;
