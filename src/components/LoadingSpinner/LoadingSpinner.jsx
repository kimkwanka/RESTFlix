import React from 'react';

import { useSelector } from 'react-redux';

import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);

  return (
    isLoading ? <div className="loading-spinner" /> : null
  );
};

export default LoadingSpinner;
