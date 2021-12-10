import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import './SearchBar.scss';

const SearchBar = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

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
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            navigate(`/search?query=${searchTerm}`);
          }
        }}
        value={searchTerm}
        placeholder="Search RESTFlix"
        onBlur={handleLoseFocus}
        ref={inputRef}
      />
    </div>
  );
};

export default SearchBar;
