import React from 'react';

import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import NavBar from './components/NavBar/NavBar';

import Routes from './Routes';

const App = () => (
  <>
    <header>
      <NavBar />
    </header>
    <LoadingSpinner />
    <Routes />
  </>
);

export default App;
