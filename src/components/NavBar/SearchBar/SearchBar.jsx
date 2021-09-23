/* eslint-disable react/no-array-index-key */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import './SearchBar.scss';

import { setSearchTerm } from '../../../redux';

const SearchBar = () => {
  const searchTerm = useSelector((state) => state.ui.searchTerm);
  const dispatch = useDispatch();

  return (
    <div className="search-bar">
      <span className="search-bar__icon">&#8981;</span>
      <input
        type="text"
        className="search-bar__input"
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        value={searchTerm}
        placeholder="Search myFlix"
      />
    </div>

  );
};

export default SearchBar;
