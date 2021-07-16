import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StoreProvider } from '../Hooks/useStoreContext';
import { LoadingSpinnerProvider } from '../Hooks/useLoadingSpinnerContext';

import MainView from '../MainView';

const App = () => (
  <BrowserRouter>
    <StoreProvider>
      <LoadingSpinnerProvider>
        <MainView />
      </LoadingSpinnerProvider>
    </StoreProvider>
  </BrowserRouter>
);

export default App;
