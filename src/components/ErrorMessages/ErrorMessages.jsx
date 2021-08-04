/* eslint-disable react/no-array-index-key */
import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { connect } from 'react-redux';

import './ErrorMessages.scss';

const ErrorMessages = ({ errorMessages }) => (
  <Row className="m-4">
    <Col>
      {errorMessages.map((e, i) => <p className="errorText" key={`err${i}`}>{e}</p>)}
    </Col>
  </Row>
);
export default connect((store) => ({
  errorMessages: store.errorMessages,
}))(ErrorMessages);
