import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import './MovieCard.scss';

import { addMovieToFavorites, removeMovieFromFavorites } from '../../redux';

const imgRoot = 'https://dry-sands-45830.herokuapp.com/img/';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  const FavoriteMovies = useSelector((state) => state.user.data.FavoriteMovies);
  const isFavorite = FavoriteMovies.indexOf(movie._id) !== -1;

  const addToFavorites = (e, movieID) => {
    e.preventDefault();
    dispatch(addMovieToFavorites(movieID));
  };

  const removeFromFavorites = (e, movieID) => {
    e.preventDefault();
    dispatch(removeMovieFromFavorites(movieID));
  };

  return (
    <Link className="movie-card h-100" to={`movies/${movie._id}`}>
      <div className="h-100 position-relative">
        {isFavorite ? <span className="favorite-star">★</span> : null}
        <img crossOrigin="anonymous" variant="top" src={`${imgRoot}${movie.ImagePath}`} alt={movie.Title} />
        {!isFavorite
          ? <button type="button" className="fav-btn align-self-end m-2 px-3 w-auto" variant="success" size="sm" onClick={(e) => addToFavorites(e, movie._id)}>+ Add favorite</button>
          : <button type="button" className="fav-btn align-self-end m-2 px-3 w-auto" variant="outline-danger" size="sm" onClick={(e) => removeFromFavorites(e, movie._id)}>- Remove favorite</button>}
        <div className="card-body">
          <div className="card-title">{movie.Title}</div>
          <div className="card-text">{movie.Description}</div>
        </div>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};

export default React.memo(MovieCard);
