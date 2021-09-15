import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import reducers from './redux/reducers';
import { LoadingSpinnerProvider } from './components/Hooks/useLoadingSpinnerContext';

import MainView from './components/MainView';

const store = createStore(reducers, devToolsEnhancer());

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <LoadingSpinnerProvider>
        <MainView />
      </LoadingSpinnerProvider>
    </Provider>
  </BrowserRouter>
);

export default App;
