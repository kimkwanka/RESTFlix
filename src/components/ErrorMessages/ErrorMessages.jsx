/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import './ErrorMessages.scss';

const ErrorMessages = ({ errorMessages }) => (
  <div className="m-4">
    <div>
      {errorMessages.map((e, i) => <p className="errorText" key={`err${i}`}>{e}</p>)}
    </div>
  </div>
);

ErrorMessages.propTypes = {
  errorMessages: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect((store) => ({
  errorMessages: store.errorMessages,
}))(ErrorMessages);
