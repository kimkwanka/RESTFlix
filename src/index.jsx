import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import dotenv from 'dotenv';

import rootReducer from './redux';

import App from './App';

dotenv.config();

const preloadedUser = {
  ...JSON.parse(localStorage.getItem('user')),
  isLoggedIn: true,
};

const preloadedState = preloadedUser.token
  ? { user: preloadedUser }
  : {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
