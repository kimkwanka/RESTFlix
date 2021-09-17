import React from 'react';

import { useSelector } from 'react-redux';

import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import NavBar from './components/NavBar/NavBar';

import Routes from './Routes';

const App = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <LoadingSpinner isLoading={isLoading} />
      <Routes />
    </>
  );
};

export default App;
