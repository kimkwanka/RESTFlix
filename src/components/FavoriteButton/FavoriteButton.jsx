import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import './FavoriteButton.scss';

import { addMovieToFavorites, removeMovieFromFavorites } from '../../redux';

const FavoriteButton = ({ movieId }) => {
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
        className="favorite-button clear"
        onClick={(e) => addToFavorites(e)}
      >
        &#10010; &#x2661;
      </button>
    ) : (
      <button
        type="button"
        className="favorite-button clear--secondary"
        onClick={(e) => removeFromFavorites(e)}
      >
        &#8722; &#x2661;
      </button>
    )
  );
};

FavoriteButton.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default React.memo(FavoriteButton);
