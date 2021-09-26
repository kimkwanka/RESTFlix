import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import './FavoriteButton.scss';

import { addMovieToFavorites, removeMovieFromFavorites } from '../../redux';

const FavoriteButton = ({ movieId, showText, clear }) => {
  const dispatch = useDispatch();

  const favoriteMovies = useSelector((state) => state.user.data.favoriteMovies);
  const isFavorite = favoriteMovies.indexOf(movieId) !== -1;

  const addToFavorites = (e) => {
    e.preventDefault();
    dispatch(addMovieToFavorites(movieId));
  };

  const removeFromFavorites = (e) => {
    e.preventDefault();
    dispatch(removeMovieFromFavorites(movieId));
  };

  return (

    !isFavorite ? (
      <button
        type="button"
        className={`favorite-button ${clear ? 'clear' : ''}`}
        onClick={(e) => addToFavorites(e)}
      >
        &#10010;
        {showText ? ' Add to Favorites ' : ' '}
        &#x2661;
      </button>
    ) : (
      <button
        type="button"
        className={`favorite-button secondary ${clear ? 'clear--secondary' : ''}`}
        onClick={(e) => removeFromFavorites(e)}
      >
        &#8722;
        {showText ? ' Remove from Favorites ' : ' '}
        &#x2661;
      </button>
    )
  );
};

FavoriteButton.propTypes = {
  movieId: PropTypes.string.isRequired,
  showText: PropTypes.bool,
  clear: PropTypes.bool,
};

FavoriteButton.defaultProps = {
  showText: false,
  clear: false,
};

export default React.memo(FavoriteButton);
