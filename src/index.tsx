import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from '#redux/store';

import App from './App';

if (!process.env.VITE_MOVIE_API_URL) {
  throw new Error(
    'Environment variable MOVIE_API_URL is not set. Either provide it via a .env file or natively in your OS.',
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
