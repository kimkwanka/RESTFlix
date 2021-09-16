import React from 'react';

import { useSelector } from 'react-redux';

import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

import Routes from './Routes';

const App = () => {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      {Routes}
    </>
  );
};

export default App;
