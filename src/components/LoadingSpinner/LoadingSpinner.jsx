import React from 'react';
import PropTypes from 'prop-types';

import './LoadingSpinner.scss';

const LoadingSpinner = ({ isLoading }) => (
  isLoading ? <div className="loading-spinner" /> : null
);

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoadingSpinner;
