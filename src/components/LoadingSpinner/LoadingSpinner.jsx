import React from 'react';

import { useSelector } from 'react-redux';

import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  const isRequestPending = useSelector((state) => state.ui.isRequestPending);

  return (
    isRequestPending ? <div className="loading-spinner" /> : null
  );
};

export default LoadingSpinner;
