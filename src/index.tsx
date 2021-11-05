import './_env';

import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './redux';

import App from './App';

if (!process.env.MOVIE_API_URL) {
  throw new Error(
    'Environment variable MOVIE_API_URL is not set. Either provide it via a .env file or natively in your OS.',
  );
}

const preloadedUser = {
  ...JSON.parse(localStorage.getItem('user') || ''),
  isLoggedIn: true,
};

const preloadedState = preloadedUser.token ? { user: preloadedUser } : {};

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
