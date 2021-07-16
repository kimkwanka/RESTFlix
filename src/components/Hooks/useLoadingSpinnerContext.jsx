import React, { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

const initialState = false;

const LoadingSpinnerContext = createContext(initialState);

const useLoadingSpinner = () => useContext(LoadingSpinnerContext);

const LoadingSpinnerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(initialState);

  return (
    <LoadingSpinnerContext.Provider value={[isLoading, setIsLoading]}>
      {children}
    </LoadingSpinnerContext.Provider>
  );
};

LoadingSpinnerProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { LoadingSpinnerProvider, useLoadingSpinner };
