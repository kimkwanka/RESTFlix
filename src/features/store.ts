import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './index';

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof rootReducer>;

export default store;
