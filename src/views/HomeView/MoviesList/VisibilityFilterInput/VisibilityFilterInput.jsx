/* eslint-disable react/no-array-index-key */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import './VisibilityFilterInput.scss';

import { setFilter } from '../../../../redux';

const VisibilityFilterInput = () => {
  const visibilityFilter = useSelector((state) => state.ui.visibilityFilter);
  const dispatch = useDispatch();

  return (
    <input
      onChange={(e) => dispatch(setFilter(e.target.value))}
      value={visibilityFilter}
      placeholder="Search myFlix"
    />
  );
};

export default VisibilityFilterInput;
