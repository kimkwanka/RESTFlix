/* eslint-disable react/no-array-index-key */
import React from 'react';

import Form from 'react-bootstrap/Form';

import { connect } from 'react-redux';

import './VisibilityFilterInput.scss';

import * as actions from '../../redux/actions';

const VisibilityFilterInput = ({ visibilityFilter, setFilter }) => (
  <Form.Control
    onChange={(e) => setFilter(e.target.value)}
    value={visibilityFilter}
    placeholder="Search myFlix"
  />
);

export default connect((store) => ({
  visibilityFilter: store.visibilityFilter,
}),
{ setFilter: actions.setFilter })(VisibilityFilterInput);
