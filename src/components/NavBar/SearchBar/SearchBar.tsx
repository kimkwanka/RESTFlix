/* eslint-disable react/no-array-index-key */
import React, { useState, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { setSearchTerm } from '../../../features';

import { IState } from '../../../features/types';

import './SearchBar.scss';

const SearchBar = () => {
  const searchTerm = useSelector((state: IState) => state.ui.searchTerm);
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
    inputRef.current?.focus();
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
