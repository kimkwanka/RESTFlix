import React from 'react';

import { useSelector } from 'react-redux';

import { IState } from '@features/types';

import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  const isRequestPending = useSelector(
    (state: IState) => state.ui.isRequestPending,
  );

  return isRequestPending ? <div className="loading-spinner" /> : null;
};

export default LoadingSpinner;
