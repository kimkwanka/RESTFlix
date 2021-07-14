/* eslint-disable react/no-array-index-key */
import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './ErrorMessages.scss';

import { useStoreContext } from '../Store';

const ErrorMessages = () => {
  const [{ errorMessages }] = useStoreContext();
  return (
    <Row className="m-4">
      <Col>
        {errorMessages.map((e, i) => <p className="errorText" key={`err${i}`}>{e}</p>)}
      </Col>
    </Row>
  );
};

export default ErrorMessages;
