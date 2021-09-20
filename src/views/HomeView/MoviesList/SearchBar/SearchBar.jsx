/* eslint-disable react/no-array-index-key */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import './SearchBar.scss';

import { setSearchTerm } from '../../../../redux';

const SearchBar = () => {
  const searchTerm = useSelector((state) => state.ui.searchTerm);
  const dispatch = useDispatch();

  return (
    <input
      onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      value={searchTerm}
      placeholder="Search myFlix"
    />
  );
};

export default SearchBar;
