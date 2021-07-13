import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StoreProvider } from '../Store';
import MainView from '../MainView';

const App = () => (
  <BrowserRouter>
    <StoreProvider>
      <MainView />
    </StoreProvider>
  </BrowserRouter>
);

export default App;
