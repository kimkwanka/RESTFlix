/* eslint-disable react/no-array-index-key */
import React from 'react';

import { connect } from 'react-redux';

import './VisibilityFilterInput.scss';

import * as actions from '../../redux/actions';

const VisibilityFilterInput = ({ visibilityFilter, setFilter }) => (
  <input
    onChange={(e) => setFilter(e.target.value)}
    value={visibilityFilter}
    placeholder="Search myFlix"
  />
);

export default connect((store) => ({
  visibilityFilter: store.visibilityFilter,
}),
{ setFilter: actions.setFilter })(VisibilityFilterInput);
