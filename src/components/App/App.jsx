import React from 'react';

import { StoreProvider } from '../Store';
import MainView from '../MainView';

const App = () => (
  <StoreProvider>
    <MainView />
  </StoreProvider>
);

export default App;
