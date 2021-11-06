import React from 'react';

import { useSelector, RootStateOrAny } from 'react-redux';

import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  const isRequestPending = useSelector(
    (state: RootStateOrAny) => state.ui.isRequestPending,
  );

  return isRequestPending ? <div className="loading-spinner" /> : null;
};

export default LoadingSpinner;
