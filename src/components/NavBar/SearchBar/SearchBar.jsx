/* eslint-disable react/no-array-index-key */
import React, { useState, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import './SearchBar.scss';

import { setSearchTerm } from '../../../features';

const SearchBar = () => {
  const searchTerm = useSelector((state) => state.ui.searchTerm);
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
    inputRef.current.focus();
  };

  const handleLoseFocus = () => {
    setIsOpen(false);
  };

  return (
    <div className={`search-bar ${isOpen ? 'search-bar--opened' : ''}`}>
      <button
        type="button"
        className="search-bar__open-button"
        onClick={handleOpenClick}
      >
        <span className="search-bar__open-button__icon">&#8981;</span>
      </button>
      <input
        type="text"
        className="search-bar__input"
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        value={searchTerm}
        placeholder="Search myFlix"
        onBlur={handleLoseFocus}
        ref={inputRef}
      />
    </div>
  );
};

export default SearchBar;
