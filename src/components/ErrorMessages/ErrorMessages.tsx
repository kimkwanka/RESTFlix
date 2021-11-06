/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { IState } from '@features/types';

import './ErrorMessages.scss';

const ErrorMessages = ({
  errorType,
}: {
  errorType: 'loginErrors' | 'registerErrors' | 'profileErrors';
}) => {
  const errorMessages = useSelector((state: IState) => state.errors[errorType]);

  return (
    <div className="m-4">
      <div>
        {errorMessages.map((e, i) => (
          <p className="error-text" key={`err${i}`}>
            {e}
          </p>
        ))}
      </div>
    </div>
  );
};

ErrorMessages.propTypes = {
  errorType: PropTypes.string.isRequired,
};

export default ErrorMessages;
