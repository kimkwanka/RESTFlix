import React from 'react';

import { useSelector } from 'react-redux';

import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const isRequestPending = useSelector((state) => state.ui.isRequestPending);

  return (
    isLoading || isRequestPending ? <div className="loading-spinner" /> : null
  );
};

export default LoadingSpinner;
