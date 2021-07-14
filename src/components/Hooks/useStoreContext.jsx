import React, { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  user: null, token: null, movies: [], errorMessages: [],
};

const StoreContext = createContext(initialState);

const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
  const [storeState, setStoreState] = useState(initialState);

  return (
    <StoreContext.Provider value={[storeState, setStoreState]}>
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { StoreProvider, useStore };
