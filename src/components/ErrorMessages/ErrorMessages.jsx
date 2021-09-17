/* eslint-disable react/no-array-index-key */
import React from 'react';

import { useSelector } from 'react-redux';

import './ErrorMessages.scss';

const ErrorMessages = () => {
  const errorMessages = useSelector((state) => state.errors);

  return (
    <div className="m-4">
      <div>
        {errorMessages.map((e, i) => (
          <p className="errorText" key={`err${i}`}>
            {e}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ErrorMessages;
