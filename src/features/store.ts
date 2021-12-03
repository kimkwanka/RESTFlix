import { configureStore } from '@reduxjs/toolkit';

import { moviesApi } from '@features/slices/api';

import rootReducer from './index';

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof rootReducer>;

export default store;
